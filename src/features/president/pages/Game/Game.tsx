import React, { useEffect, useState } from "react";

import { useFirebase } from "features/firebase";
import useEffectOnMount from "utils/hooks/useEffectOnMount";
import useEffectIfPropChanges from "utils/hooks/useEffectIfPropChanges";
import { Users } from "features/president/types";

import dealDeck from "../../logic/deal";
import { getMyUnplayedCards } from "../../logic/utils";

import Players from "../../components/Players";
import CardsPlayed from "../../components/CardsPlayed";
import Hand from "../../components/Hand";
import useGameId from "./hooks";
import useIsSignedIn from "features/auth/hooks/useIsSignedIn";

export default function President() {
  const [counter, setCounter] = useState(0);
  const firebase = useFirebase();
  firebase.game.addPlayerJoinListener(setCounter);
  const signedIn = useIsSignedIn();

  const gameId = useGameId();

  const [users, setUsers] = useState<Users>([]);

  useEffectIfPropChanges(() => {
    const { players, currentPlayer } = firebase.game.getState();
    const { userId } = firebase.user.getState();
    if (players) {
      const users = Object.keys(players).map(currentUserId => {
        return {
          isMe: currentUserId === userId,
          displayName: players[currentUserId],
          active: currentPlayer === currentUserId
        };
      });
      setUsers(users);
    }
  }, counter);

  useEffectIfPropChanges(() => {
    firebase.game.joinGameIfNecessary(gameId);
  }, signedIn);

  useEffectOnMount(() => {
    console.log("joining");
    const {
      players,
      currentPlayer,
      gameId: gameIdS
    } = firebase.game.getState();
    const { userId } = firebase.user.getState();

    if (!gameIdS) {
      firebase.game.joinGameIfNecessary(gameId);
    } else if (players) {
      const users = Object.keys(players).map(currentUserId => {
        return {
          isMe: currentUserId === userId,
          displayName: players[currentUserId],
          active: currentPlayer === currentUserId
        };
      });
      setUsers(users);
    }
  });

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
