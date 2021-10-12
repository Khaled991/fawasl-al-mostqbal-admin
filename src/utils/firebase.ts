import 'firebase/firestore';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc, Timestamp } from 'firebase/firestore';
import { initializeApp } from '@firebase/app';
import {
  createUserWithEmailAndPassword,
  // , User
} from '@firebase/auth';
import sha1 from 'sha1';
// import { ICurrentUser } from "../redux/auth/auth.models";

const firebaseConfig = {
  apiKey: 'AIzaSyA9Q7OLg68FKV_ntGoSMeN8_Q7LrAHyzc4',
  authDomain: 'fwasel-al-mostaqbal.firebaseapp.com',
  projectId: 'fwasel-al-mostaqbal',
  storageBucket: 'fwasel-al-mostaqbal.appspot.com',
  messagingSenderId: '278728204932',
  appId: '1:278728204932:web:224c0d7971b3d9533958d1',
  measurementId: 'G-8N9VDXG7HN',
};

initializeApp(firebaseConfig);

export type ICreatedAt = {
  date: string;
  atTime: string;
};

export interface IFirestoreDate {
  seconds: number;
  nanoseconds: number;
}

export const toJsDateAndTimeFromFirestoreDate = (
  firebaseDate: Timestamp | Date
): ICreatedAt => {
  let timeStamp: Date;

  if (firebaseDate instanceof Timestamp) {
    timeStamp = new Date(
      firebaseDate.seconds * 1000 + firebaseDate.nanoseconds / 1000000
    );
    // if (firebaseDate instanceof Timestamp) console.log("Timestamp", timeStamp);
    // else console.log("Date", timeStamp);
  } else {
    timeStamp = firebaseDate;
  }

  const date = timeStamp.toDateString();
  const atTime = timeStamp.toLocaleTimeString();

  return { date, atTime };
};

export class NewUser {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = sha1(password);
  }
}
// example
// createNewAccount(new NewUser("ahmed.waleed919@outlook.com", "asdasd"));
export const createNewAccount = async (newUserData: NewUser) => {
  const { user } = await createUserWithEmailAndPassword(
    auth,
    newUserData.email,
    newUserData.password
  );

  const userRef = doc(getFirestore(), 'users', user.uid);
  await setDoc(userRef, { email: newUserData.email });
};

export const convertAuthSnapshotToMap = ({ uid, email }: any) => {
  return {
    uid: uid,
    email: email,
  };
};

export const auth = getAuth();
export const firestore = getFirestore();
