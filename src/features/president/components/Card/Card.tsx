import React from "react";

import { getImageFileNameFromLabel } from "features/president/logic/utils";

export default function Card() {
  const card = getImageFileNameFromLabel("hearts-13");
  console.log(card);
  return <img src={require(`assets/cards/${card}.svg`)} alt={card} />;
}

export function CardBack() {
  return <img src={require(`assets/cards/1B.svg`)} alt="card back" />;
}
