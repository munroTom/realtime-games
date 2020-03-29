import React from "react";
import { NavLink } from "react-router-dom";
import { linkToLogIn, linkToSignUp } from "routes/globalLinks";

import styles from "./AuthenticationButtons.module.scss";

export type Props = { className: string };
export default function AuthenticationButtons({ className }: Props) {
  return (
    <div className={className}>
      <NavLink to={linkToLogIn()} className={styles.button}>
        Login
      </NavLink>
      <NavLink to={linkToSignUp()} className={styles.button}>
        Sign up
      </NavLink>
    </div>
  );
}
