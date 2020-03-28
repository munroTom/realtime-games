import React from "react";

import Player from "../Player";

import styles from "./Players.module.scss";

type Props = { user: string };

const users = [
  { user: "Tom", active: true },
  { user: "Conor", active: false },
  { user: "Nay", active: false }
];
export default function Players() {
  return (
    <div className={styles.wrapper}>
      {users.map(({ user, active }) => (
        <Player user={user} active={active} />
      ))}
    </div>
  );
}
