import React, { useEffect, useState } from "react";

import { useFirebase } from "features/firebase";
import useEffectOnMount from "utils/hooks/useEffectOnMount";

import dealDeck from "./logic/deal";
import { getMyUnplayedCards } from "./logic/utils";

import Players from "./components/Players";
import CardsPlayed from "./components/CardsPlayed";
import Hand from "./components/Hand";

const users = [
  { displayName: "Tom", active: true, isMe: true },
  { displayName: "Conor", active: false, isMe: false },
  { displayName: "Nay", active: false, isMe: false }
];

export default function President() {
  // const firebase = useFirebase();
  // const [fetched, setFetched] = useState(false);
  // const [deck, setDeck] = useState(null);
  // const [cardsPlayed,setCardsPlayed] = useState(null)
  const deck = dealDeck(users.map(({ displayName }) => displayName));

  // useEffectOnMount(async () => {
  //   const roundFetchSucceeded = await firebase.getCurrentRound("1");
  //   const trickFetchSucceeded = await firebase.getCurrentTrick("1");
  //   setFetched(roundFetchSucceeded && trickFetchSucceeded);
  // });

  // useEffect(() => {
  //   setDeck(firebase.getState().round.cards);
  //   set
  // }, [fetched]);

  const myCards = getMyUnplayedCards(deck, users);

  return (
    <div>
      <Players users={users} />
      <CardsPlayed />
      <Hand cards={myCards} />
    </div>
  );
}
