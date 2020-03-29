import { getCardRank } from "features/president/logic/utils";

type ValidateCardsPlayed = {
  playedCards: Array<string>;
  cardsToPlay: Array<string>;
  trickType: number | null;
};
export function validateCardsPlayed({
  playedCards,
  cardsToPlay,
  trickType
}: ValidateCardsPlayed) {
  if (!cardsToPlay.length) {
    return false;
  }

  if (trickType && cardsToPlay.length !== trickType) {
    return false;
  }
  const ranksToPlay = cardsToPlay.map(getCardRank);

  if (cardsAreNotTheSame(ranksToPlay)) {
    return false;
  }

  let lastPlayedCard = playedCards.length
    ? playedCards[playedCards.length - 1]
    : null;
  if (!lastPlayedCard) {
    return true;
  }

  const lastPlayedRank = getCardRank(lastPlayedCard);

  if (ranksToPlay[0] < lastPlayedRank) {
    return false;
  }

  return true;
}

function cardsAreNotTheSame(ranksToPlay: Array<number>) {
  const dummy: any = {};
  ranksToPlay.forEach(rank => {
    dummy[rank] = true;
  });

  return Object.keys(dummy).length !== 1;
}
