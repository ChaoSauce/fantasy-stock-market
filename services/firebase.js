import { firebase, FieldValue } from '../lib/firebase';

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
    .where('userId', '==', userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
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

export async function getPosts(userId) {
  const result = await firebase
    .firestore()
    .collection('posts')
    .where('userId', '==', userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
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