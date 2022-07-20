import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup,GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut,onAuthStateChanged} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyA70nzu7FRZ7MUTW44rbQ1vWWm_s7iHVhE",
    authDomain: "crown-clothing-db-81eab.firebaseapp.com",
    projectId: "crown-clothing-db-81eab",
    storageBucket: "crown-clothing-db-81eab.appspot.com",
    messagingSenderId: "804631245499",
    appId: "1:804631245499:web:71a876f74c6babf4b16f9e"
  };
  

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
  ) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);
    objectsToAdd.forEach((object) => {
       const docRef = doc(collectionRef, object.title.toLowerCase());
       batch.set(docRef, object);
    });
  
    await batch.commit();
    console.log('done');
  };

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
  
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  
    return categoryMap;
  };


  export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
        }
        catch(error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async(email, password) =>{
    if(!email || !password) return;
    createAuthUserWithEmailAndPassword(auth, email, password)
  }

  export const signInAuthUserWithEmailAndPassword = async(email, password) =>{
    if(!email || !password) return;
    signInWithEmailAndPassword(auth, email, password)
  }

  export const signOutUser= async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);