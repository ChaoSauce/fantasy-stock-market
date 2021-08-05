import { firebase, FieldValue, FieldPath } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get();
    
  return result.docs.length > 0;
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .get();

  return {...result.data(), docId: userId};
}

export async function getLeagues() {
  let result = result = await firebase
    .firestore()
    .collection('leagues')
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function getUserPosts(userData, userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('posts')
    .get();



  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
    fullName: userData.fullName,
    username: userData.username,
    profileImage: userData.profileImage
  }));
}

export async function getFollowingPosts(following) {
  let posts = [];

  const result = await firebase
    .firestore()
    .collection('users')
    .where(FieldPath.documentId(), 'in', following)
    .get();

  for (let i = 0; i < result.docs.length; i++) {
    const userPosts = await getUserPosts(result.docs[i].data(), result.docs[i].id);

    posts = [...posts, ...userPosts];
  }

  return posts;
}

export async function getUsersBySearchText(startcode, endcode) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('fullName', '>=', startcode)
    .where('fullName', '<', endcode)
    .get();

    return result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }));
}

export async function uploadProfileImage(uri) {
  const childPath = `users/${firebase.auth().currentUser.uid}`;
  const response = await fetch(uri);
  const blob = await response.blob();

  const imageExists = false;

  try {
    await firebase
      .storage()
      .ref()
      .child(childPath)
      .getDownloadURL();

    imageExists = true;
  } catch (error) {
    console.log('Profile image does not exist to delete.');
  }
  
  if (imageExists) {
    await firebase
      .storage()
      .ref()
      .child(childPath)
      .delete();
  }

  const task = firebase
    .storage()
    .ref()
    .child(childPath)
    .put(blob);

  const taskProgress = snapshot => {
    // console.log(`transferred: ${snapshot.bytesTransferred}`)
  }

  const taskCompleted = () => {
    task.snapshot.ref.getDownloadURL().then(snapshot => {
      updateProfileImage(snapshot);
    })
  }

  const taskError = snapshot => {
    // console.log(snapshot);
  }

  task.on("state_changed", taskProgress, taskError, taskCompleted);
}

export async function updateProfileImage(downloadURL) {
  console.log(firebase.auth().currentUser.uid);
  return firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .update({
      profileImage: downloadURL
    });
}