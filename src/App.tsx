import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { FirebaseContext, Firebase } from "features/firebase";

import Routes from "routes/Routes";

import "./App.css";

export default function App() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Router>
        <Routes />
      </Router>
    </FirebaseContext.Provider>
  );
}
