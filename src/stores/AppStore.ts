import { createContext, useContext } from "react";
import { observable, action } from "mobx";
import { firebaseInstance } from "../firebase";

class AppStore {
  @observable user: firebase.User | null = null;
  @observable didInitialize = false;

  @action.bound setUser(user: firebase.User | null) {
    this.user = user;
    if (!this.didInitialize) {
      this.didInitialize = true;
    }
  }

  constructor() {
    console.log("AppStore instanciated");
    firebaseInstance.auth.onAuthStateChanged(this.setUser);
  }
}
export const appStoreInstance = new AppStore();
export const AppStoreContext = createContext(appStoreInstance);
