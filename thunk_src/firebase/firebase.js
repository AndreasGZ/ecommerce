import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCT0bOcQmTv4hJM3TFINbCu9EHA5R06bE0",
  authDomain: "crowndb-541f3.firebaseapp.com",
  projectId: "crowndb-541f3",
  storageBucket: "crowndb-541f3.appspot.com",
  messagingSenderId: "283269354557",
  appId: "1:283269354557:web:7f2ff7d5d1cfdc5b150654"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // Wenn der user = null, dann abbrechen
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  // Wenn der user nicht existiert, dann erstellen
  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    // User erstellen
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log("error creating user", error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// firestore.collection(name).doc(id).collection(name).doc(id)
// firestore.doc("/name/id/name/id")
// firestore.collection("/name/id/name")

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider)

// Man muss das Array einzeln einfügen
// Wenn Internet ausfällt, dann landetnur ein Teil in der DB
//--> Batch-Objekt setzen
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // Neue DokumentReferenz erzeugen
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export const convertCollectionSnapshotToMap = (collections) => {

  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      // String zu URL-fähigem String
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  // Array in Objekt umwandeln
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  } , {});

  // console.log(transformedCollection);
}

export default firebase;
