import React from "react";
import classNames from "classnames";

import type {User} from '../../types'

import styles from "./Player.module.scss";

type Props = User

export default function Player({ displayName, active,isMe }: Props) {
  return (
    <div className={classNames(styles.wrapper, { [styles.active]: active })}>
      {isMe?'Me':displayName}
    </div> 
  );
}
