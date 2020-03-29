import type { Deck, Users } from "../types";

export function getImageFileNameFromLabel(label: string) {
  const arr = label.split("-");

  return `${getRank(arr[1])}${getSuit(arr[0])}`.toUpperCase();
}

export function getCardRank(label:string){
  const arr = label.split("-");

  return Number(arr[1]);
}

function getSuit(suit: string) {
  return suit.substring(0, 1);
}

function getRank(rank: string) {
  if (rank === "1") {
    return "A";
  }
  if (rank === "10") {
    return "T";
  }
  if (rank === "11") {
    return "J";
  }
  if (rank === "12") {
    return "Q";
  }
  if (rank === "13") {
    return "K";
  }

  return rank;
}

export function getMyUnplayedCards(deck: Deck| null, users: Users) {

  if(!deck){
    return null
  }
  
  const me = users.find(({ isMe }) => isMe);

  const myUnplayedCards: Array<string> = Object.keys(deck).reduce(
    (reduction, cardKey) => {
      const card = deck[cardKey];
      if (!card.played && card.user === me?.displayName) {
        //@ts-ignore
        reduction.push(cardKey);
      }

      return reduction;
    },
    []
  );

  const sortedCards = myUnplayedCards.sort((cardOne,cardTwo)=>{
    const rankOne = cardOne.split('-')[1]
    const rankTwo = cardTwo.split('-')[1]

    return Number(rankOne) -Number(rankTwo)
  })

  return sortedCards;
}
