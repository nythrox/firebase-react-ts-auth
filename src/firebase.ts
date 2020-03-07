import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { createContext } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyA7HttQ3NkrBv2SdUh2E0k-TZ_INPfL84s",
  authDomain: "firebest-1cf01.firebaseapp.com",
  databaseURL: "https://firebest-1cf01.firebaseio.com",
  projectId: "firebest-1cf01",
  storageBucket: "firebest-1cf01.appspot.com",
  messagingSenderId: "1075191564970",
  appId: "1:1075191564970:web:6331373c405ce8048b1ed3",
  measurementId: "G-GBGTZZELX8"
};
export class Firebase {
  public db: firebase.firestore.Firestore;
  public auth: firebase.auth.Auth;
  public app: firebase.app.App;
  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  }

  login(email: string, password: string) {
    try {
      return this.auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw e;
    }
  }

  logout() {
    try {
      return this.auth.signOut();
    } catch (e) {
      throw e;
    }
  }

  async register(email: string, password: string) {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      return this.auth.currentUser?.updateProfile({
        displayName: email
      });
    } catch (e) {
      throw e;
    }
  }
}

export const firebaseInstance = new Firebase();
export const FirebaseContext = createContext(firebaseInstance);
