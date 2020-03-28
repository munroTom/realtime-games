import React from "react";

import dealDeck from "features/president/features/deal";

import logo from "./logo.svg";
import "./App.css";

export default function App() {
  dealDeck(["1", "2", "3"]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
