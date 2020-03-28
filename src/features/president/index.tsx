import React, { useContext } from "react";

import { FirebaseContext, Firebase } from "features/firebase";

import dealDeck from "./features/deal";

import Players from "./components/Players";

export default function President() {
  const Firebase = useContext(FirebaseContext) as Firebase;

  const deck = dealDeck(["1", "2", "3"]);

  //   Firebase.dealCards("1", deck);
  return (
    <div>
      <Players />
    </div>
  );
}
