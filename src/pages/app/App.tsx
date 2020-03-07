import React from "react";

import { AppStoreContext, appStoreInstance } from "../../stores/AppStore";
import { FirebaseContext, firebaseInstance } from "../../firebase";
import { Routes } from "../routes/Routes";
function App() {
  console.log("app restarted");
  return (
    <FirebaseContext.Provider value={firebaseInstance}>
      <AppStoreContext.Provider value={appStoreInstance}>
        <Routes />
      </AppStoreContext.Provider>
    </FirebaseContext.Provider>
  );
}

export default App;
