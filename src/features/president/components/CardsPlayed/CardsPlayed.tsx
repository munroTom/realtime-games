import React, { useState, useEffect } from "react";

import { useFirebase } from "features/firebase";

import Card from "../Card";

import styles from "./CardsPlayed.module.scss";

export default function CardsPlayed() {
  const [counter, setCounter] = useState(0);
  const [cardsPlayed, setCardsPlayed] = useState([]);
  const firebase = useFirebase();
  firebase.addTrickListener(setCounter);

  useEffect(() => {
    setCardsPlayed(firebase.getState().trick.cardsPlayed);
  }, [counter]);

  return (
    <div className={styles.wrapper}>
      {cardsPlayed.map((card, index) => (
        <div
          key={`${card}-${index}`}
          style={{
            position: "absolute",
            transform: `rotate(${index * 30}deg)`
          }}
          className={styles.cardWrapper}
        >
          <Card label={card} className={styles.card} />
        </div>
      ))}
    </div>
  );
}
