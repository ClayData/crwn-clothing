import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
        apiKey: "AIzaSyAgRbEpQlBqavT_W52sHsfOo9lROXpvNjA",
        authDomain: "crwn-db-9144d.firebaseapp.com",
        databaseURL: "https://crwn-db-9144d.firebaseio.com",
        projectId: "crwn-db-9144d",
        storageBucket: "crwn-db-9144d.appspot.com",
        messagingSenderId: "470104354281",
        appId: "1:470104354281:web:17b1803f78811663342f78"
      };

      firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.id}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;