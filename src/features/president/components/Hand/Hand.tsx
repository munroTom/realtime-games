import React, { useState } from "react";

import Card from "../Card";

import styles from "./Hand.module.scss";

type Props = { cards: Array<string> };

export default function Hand({ cards }: Props) {
  const [selectedCards, setSelectedCards] = useState<{
    [card: string]: boolean;
  }>({});

  const toggleCardSelected = (card: string) => {
    const mutableCards = { ...selectedCards };
    if (selectedCards[card]) {
      mutableCards[card] = false;
    } else {
      mutableCards[card] = true;
    }
    setSelectedCards(mutableCards);
  };
  return (
    <div className={styles.wrapper}>
      {cards.map((card, index) => {
        const isSelected = selectedCards[card];
        return (
          <div
            className={styles.cardWrapper}
            style={{
              left: index * 30,
              top: isSelected ? -20 : 0
            }}
            onClick={() => toggleCardSelected(card)}
          >
            <Card label={card} className={styles.card} />
          </div>
        );
      })}
    </div>
  );
}
