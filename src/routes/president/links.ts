import { linkToHomePage } from "../links";

export function linkToPresident() {
  return `${linkToHomePage()}/president`;
}

export function linkToPresidentGame(gameId: string = ":gameId") {
  return `${linkToPresident()}/game/${gameId}`;
}
