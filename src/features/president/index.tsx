import React, { useContext } from "react";

import { FirebaseContext, Firebase } from "features/firebase";

import dealDeck from "./logic/deal";
import { getMyUnplayedCards } from "./logic/utils";

import Players from "./components/Players";

import Hand from "./components/Hand";

const users = [
  { displayName: "Tom", active: true, isMe: true },
  { displayName: "Conor", active: false, isMe: false },
  { displayName: "Nay", active: false, isMe: false }
];

export default function President() {
  const Firebase = useContext(FirebaseContext) as Firebase;

  const deck = dealDeck(users.map(({ displayName }) => displayName));

  const myCards = getMyUnplayedCards(deck, users);

  return (
    <div>
      <Players users={users} />
      <Hand cards={myCards} />
    </div>
  );
}
