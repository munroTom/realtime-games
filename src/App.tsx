import React from "react";

import { FirebaseContext, Firebase } from "features/firebase";

import President from "features/president";

import "./App.css";

export default function App() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <div className="App">
        <President />
      </div>
    </FirebaseContext.Provider>
  );
}
