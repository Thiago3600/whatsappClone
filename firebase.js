import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDPfiqfureUxvlv9q5je_GF3yTpG3Xq4AM",
  authDomain: "whatsappclone-e6afd.firebaseapp.com",
  projectId: "whatsappclone-e6afd",
  storageBucket: "whatsappclone-e6afd.appspot.com",
  messagingSenderId: "142358021491",
  appId: "1:142358021491:web:136a4f46b3af753fe6f106"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
