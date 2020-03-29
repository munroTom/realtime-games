import { useParams } from "react-router-dom";

export default function useGameId() {
  const params = useParams();
  // @ts-ignore
  const param = params.gameId;

  if (!param) {
    throw new Error(
      `Unable to pull :gameId from the current url: ${window.location.pathname}. Have you called this under a Route with a :gameId defined in it's path?`
    );
  }

  return param;
}
