import { initialiseDeck, shuffleAndAssign } from "./utils";

export default function deal(users: Array<string>) {
  const deck = initialiseDeck();

  return shuffleAndAssign(deck, users);
}
