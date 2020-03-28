import type {Deck} from 'features/president/types'

import { suits, ranks } from "../consts";


export function initialiseDeck() {
  const deck: Deck = {};
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck[`${suit}-${rank}`] = { user: "", played: false };
    });
  });

  return deck;
}

export function shuffleAndAssign(deck: Deck, users: Array<string>) {
  const deckKeys = Object.keys(deck);
  const shuffled = deckKeys.sort(() => 0.5 - Math.random());
  let currentUserIndex = 0;

  shuffled.forEach(value => {
    deck[value].user = users[currentUserIndex];
    if (currentUserIndex === users.length - 1) {
      currentUserIndex = 0;
    } else {
      currentUserIndex++;
    }
  });

  return deck;
}
