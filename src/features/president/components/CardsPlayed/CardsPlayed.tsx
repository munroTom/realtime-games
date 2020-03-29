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
          style={{ ...getStyle(index), position: "absolute" }}
          className={styles.cardWrapper}
        >
          <Card label={card} className={styles.card} />
        </div>
      ))}
    </div>
  );
}

function getStyle(index: number) {
  const midPoint = (300 - index * 30) / 2;
  const animateIn = `@keyframes animatein-${index} {
    0% {
      opacity: 0;
      transform: translateX(1000px) rotate(300deg);
    }
    50%{
      opacity: 1;
      transform: translateX(500px) rotate(${midPoint}deg);
    }
    100% {
      opacity: 1;
      transform: translateX(0px) rotate(${index * 30}deg);
    }
  }
  `;

  const styleElement = document.createElement("style");
  let styleSheet = null;

  document.head.appendChild(styleElement);

  styleSheet = styleElement.sheet;
  // @ts-ignore
  styleSheet.insertRule(animateIn, styleSheet.cssRules.length);

  return {
    transform: `rotate(${index * 30}deg)`,
    animationName: `animatein-${index}`,
    animationIterationCount: 1,
    animationTimingFunction: "linear"
  };
}
