import React from "react";

import { getImageFileNameFromLabel } from "features/president/logic/utils";

type Props = { label: string; className: string };

export default function Card({ label, className }: Props) {
  const card = getImageFileNameFromLabel(label);
  return (
    <img
      src={require(`assets/cards/${card}.svg`)}
      alt={card}
      className={className}
    />
  );
}

export function CardBack() {
  return <img src={require(`assets/cards/1B.svg`)} alt="card back" />;
}
