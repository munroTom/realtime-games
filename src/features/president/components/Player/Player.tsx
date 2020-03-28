import React from "react";
import classNames from "classnames";

import styles from "./Player.module.scss";

type Props = { user: string; active: boolean };

export default function Player({ user, active }: Props) {
  return (
    <div className={classNames(styles.wrapper, { [styles.active]: active })}>
      {user}
    </div>
  );
}
