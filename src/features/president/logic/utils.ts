import type { Deck } from "../types";

export function getImageFileNameFromLabel(label: string) {
  const arr = label.split("-");

  return `${getRank(arr[1])}${getSuit(arr[0])}`.toUpperCase();
}

export function getCardRank(label:string){
  const arr = label.split("-");
  const rank = arr[1]

  return Number(setAceHigh(rank));
}

function setAceHigh(rank:string){
  if(rank ==='1'){
    return '14'
  }

  return rank
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

export function getMyUnplayedCards(deck: Deck| null, userId:string) {

  if(!deck){
    return null
  }
  

  const myUnplayedCards: Array<string> = Object.keys(deck).reduce(
    (reduction, cardKey) => {
      const card = deck[cardKey];
      if (!card.played && card.user === userId) {
        //@ts-ignore
        reduction.push(cardKey);
      }

      return reduction;
    },
    []
  );

  const sortedCards = myUnplayedCards.sort((cardOne,cardTwo)=>{


    return getCardRank(cardOne) -getCardRank(cardTwo)
  })

  return sortedCards;
}
