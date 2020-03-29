import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { FirebaseContext, Firebase } from "features/firebase";
import { ModalProvider } from "features/components/Modal";

import Routes from "routes/Routes";

import "./App.css";

export default function App() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <ModalProvider>
        <Router>
          <Routes />
        </Router>
      </ModalProvider>
    </FirebaseContext.Provider>
  );
}
