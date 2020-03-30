import React, { useState } from "react";

import useEffectIfPropChanges from "utils/hooks/useEffectIfPropChanges";
import { useFirebase } from "features/firebase";

import Card from "../Card";

import { validateCardsPlayed } from "./utils";
import styles from "./Hand.module.scss";
import useEffectOnMount from "utils/hooks/useEffectOnMount";
import useIsSignedIn from "features/auth/hooks/useIsSignedIn";

export default function Hand() {
  const firebase = useFirebase();
  const signedIn = useIsSignedIn();
  const [selectedCards, setSelectedCards] = useState<{
    [card: string]: boolean;
  }>({});
  const [counter, setCounter] = useState(0);
  const [trickType, setTrickType] = useState(null);
  const [playedCards, setPlayedCards] = useState<Array<string>>([]);
  const [cards, setCards] = useState<Array<string>>([]);

  useEffectIfPropChanges(async () => {
    const unplayed = await firebase.round.getMyUnplayedCards();
    if (unplayed) {
      setCards(unplayed);
    }
  }, signedIn);

  const toggleCardSelected = (card: string) => {
    const mutableCards = { ...selectedCards };
    if (selectedCards[card]) {
      delete mutableCards[card];
    } else {
      mutableCards[card] = true;
    }
    setSelectedCards(mutableCards);
  };

  const playCards = () => {
    const cardsPlayed = Object.keys(selectedCards);
    if (
      validateCardsPlayed({
        playedCards,
        cardsToPlay: cardsPlayed,
        trickType
      })
    ) {
      firebase.trick.playSelectedCards({
        selectedCards: cardsPlayed
      });
      setSelectedCards({});
    } else {
    }
  };

  firebase.addTrickListener(setCounter);

  useEffectIfPropChanges(() => {
    setPlayedCards(firebase.getState().trick.cardsPlayed);
    if (!trickType) {
      setTrickType(firebase.getState().trick.type);
    }
  }, counter);

  return (
    <div className={styles.wrapper}>
      <div>
        <button className={styles.button} onClick={playCards}>
          play cards
        </button>
        <button className={styles.button}>pass</button>
      </div>
      {cards && (
        <div
          className={styles.cardsWrapper}
          style={{ width: cards.length * 30 + 120 }}
        >
          {cards.map((card, index) => {
            const isSelected = selectedCards[card];

            const isPlayed = playedCards.includes(card);
            return (
              <div
                className={styles.cardWrapper}
                style={{
                  left: index * 30,
                  top: getTopStyle(isSelected, isPlayed)
                }}
                onClick={() => toggleCardSelected(card)}
                key={card}
              >
                <Card label={card} className={styles.card} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getTopStyle(isSelected: boolean, isPlayed: boolean) {
  if (isPlayed) {
    return 300;
  }
  if (isSelected) {
    return -20;
  }
  return 0;
}
