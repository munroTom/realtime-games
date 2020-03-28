const suites = ["hearts", "clubs", "diamonds", "spades"];
const cardValues = new Array(13).fill(0).map((_, index) => index + 1);

type Card = { user: string; played: boolean };
type Deck = { [value: string]: Card };

export function initialiseDeck() {
  const deck: Deck = {};
  suites.forEach(suite => {
    cardValues.forEach(cardValue => {
      deck[`${suite}-${cardValue}`] = { user: "", played: false };
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
