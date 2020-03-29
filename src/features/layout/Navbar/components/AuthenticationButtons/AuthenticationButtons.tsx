import React from "react";
import { NavLink } from "react-router-dom";
import { globalLinkToLogin, globalLinkToSignUp } from "routes/globalLinks";

import styles from "./AuthenticationButtons.module.scss";

export type Props = { className: string };
export default function AuthenticationButtons({ className }: Props) {
  return (
    <div className={className}>
      <NavLink to={globalLinkToLogin()} className={styles.button}>
        Login
      </NavLink>
      <NavLink to={globalLinkToSignUp()} className={styles.button}>
        Sign up
      </NavLink>
    </div>
  );
}
