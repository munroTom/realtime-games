import React, { useState } from "react";
import { useFirebase } from "features/firebase";
import { useHistory } from "react-router-dom";

type Props = {
  linkToGame: (gameId: string) => string;
};
export default function PresidentHomepage({ linkToGame }: Props) {
  const [gameId, setGameId] = useState("test");
  const firebase = useFirebase();
  const history = useHistory();
  const onCreateClick = async () => {
    const gameId = await firebase.game.createGame();

    if (gameId) {
      history.push(linkToGame(gameId));
    }
  };

  const onJoinClick = async () => {
    const joined = await firebase.game.joinGame(gameId);

    if (joined) {
      history.push(linkToGame(gameId));
    }
  };
  return (
    <div>
      President Homepage
      <button onClick={onCreateClick}>Create a new game</button>
      <input value={gameId} onChange={e => setGameId(e.target.value)} />
      <button onClick={onJoinClick}>Join exisiting game</button>
    </div>
  );
}
