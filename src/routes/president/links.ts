import { linkToHomePage } from "../links";

export function linkToPresident() {
  return `${linkToHomePage()}/president`;
}

export function linkToPresidentGame(gameId: string) {
  return `${linkToPresident()}/${gameId}`;
}
