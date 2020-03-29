import React from "react";

import type {Users} from '../../types'

import Player from "../Player";

import styles from "./Players.module.scss";


type Props = {users:Users}

export default function Players({users}:Props) {
  return (
    <div className={styles.wrapper}>
      {users.map((user) => (
        <React.Fragment key={user.displayName}>

        <Player {...user} />
        </React.Fragment>
      ))}
    </div>
  );
}
