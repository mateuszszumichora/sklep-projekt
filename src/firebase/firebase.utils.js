import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDskX6x5oduv_BslJgRLjX9OgYROOUhRpA",
    authDomain: "crwn-db-b1a33.firebaseapp.com",
    databaseURL: "https://crwn-db-b1a33.firebaseio.com",
    projectId: "crwn-db-b1a33",
    storageBucket: "",
    messagingSenderId: "780921709772",
    appId: "1:780921709772:web:63e62c20c4be5056"
  };

export const createUserProfileDocument = async (userAuth,additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  
  if(!snapShot.exists) {
    const {displayName,email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user',error.message)
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
  