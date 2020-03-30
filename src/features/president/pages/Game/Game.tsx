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
  const [currentRound, setCurrentRound] = useState("");
  const [showStarter, setShowStarter] = useState(true);
  firebase.game.addCurrentRoundListener(setCurrentRound);
  const signedIn = useIsSignedIn();

  const gameId = useGameId();

  const [users, setUsers] = useState<Users>([]);

  useEffectIfPropChanges(() => {
    setShowStarter(false);
  }, currentRound);

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

    firebase.round.listenForCurrentTrickChanges();
  }, counter);

  useEffectIfPropChanges(() => {
    firebase.game.joinGameIfNecessary(gameId);
  }, signedIn);

  useEffectOnMount(async () => {
    const {
      players,
      currentPlayer,
      gameId: gameIdS
    } = firebase.game.getState();
    const { userId } = firebase.user.getState();

    if (!gameIdS) {
      await firebase.game.joinGameIfNecessary(gameId);
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

    firebase.round.listenForCurrentTrickChanges();
  });

  return (
    <div>
      <Players users={users} />
      {showStarter ? <Starter /> : <CardsPlayed />}

      <Hand />
    </div>
  );
}

function Starter() {
  const firebase = useFirebase();

  const startRound = async () => {
    await firebase.trick.startRound();
  };

  return <StartNewRound onClick={startRound} />;
}

type SProps = { onClick: () => void };

function StartNewRound({ onClick }: SProps) {
  return <button onClick={onClick}>Start Round!</button>;
}
