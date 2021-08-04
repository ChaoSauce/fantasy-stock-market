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