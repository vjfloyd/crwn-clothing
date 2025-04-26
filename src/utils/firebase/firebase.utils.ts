import {initializeApp} from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User
} from "firebase/auth";

import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch, QueryDocumentSnapshot} from "firebase/firestore";
import {Category} from "../../store/categories/category.types";

const firebaseConfig = {
    apiKey: "AIzaSyBNHrup-WiQFmKvwcb9xkjy7uHbSYeMa8A",
    authDomain: "crown-clothing-db-94e75.firebaseapp.com",
    projectId: "crown-clothing-db-94e75",
    storageBucket: "crown-clothing-db-94e75.appspot.com",
    messagingSenderId: "688309176702",
    appId: "1:688309176702:web:369753f0693c57520f0b2f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();


export type AdditionalInformation = {
    displayName?: string;
}

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}


export const createUserDocumentFromAuth =

    async (userAuth: User,
           additionalInformation = {} as AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> => {
        console.log("userAuth=>", userAuth);
        if (!userAuth) return;

        const userDocRef = doc(db, "users", userAuth.uid);
        console.log("userDocRef=>", userDocRef);
        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
            const {displayName, email} = userAuth;
            const createdAt = new Date();

            try {
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    createdAt,
                    ...additionalInformation
                });
                console.log('User document created successfully');

            } catch (error) {
                console.log("error creating the user", error);
            }
        }
        return userSnapshot as QueryDocumentSnapshot<UserData>;
    };

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);


export type ObjectToAdd = {
    title: string;
}

export const addCollectionsAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string,
    objectsToAdd: T[]
): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("done");
};

export const getCategoriesAndCollections = async (): Promise<Category[]> => {
    console.log(" getCategoriesAndCollections -> start");
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
        (docSnapshot) => docSnapshot.data() as Category);
};

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};