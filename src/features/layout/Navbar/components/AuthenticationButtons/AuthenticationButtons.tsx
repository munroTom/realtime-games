import React from "react";
import { NavLink } from "react-router-dom";

import { globalLinkToLogin, globalLinkToSignUp } from "routes/globalLinks";
import { linkToHomePage } from "routes/links";

import useIsSignedIn from "features/auth/hooks/useIsSignedIn";

import styles from "./AuthenticationButtons.module.scss";
import { useFirebase } from "features/firebase";

export type Props = { className: string };
export default function AuthenticationButtons({ className }: Props) {
  const isSignedIn = useIsSignedIn();
  const firebase = useFirebase();
  const onLogout = async () => {
    firebase.game.leaveCurrentGame();
    firebase.user.logout();
  };

  return (
    <div className={className}>
      {isSignedIn ? (
        <NavLink
          to={linkToHomePage()}
          onClick={onLogout}
          className={styles.button}
        >
          Logout
        </NavLink>
      ) : (
        <>
          <NavLink to={globalLinkToLogin()} className={styles.button}>
            Login
          </NavLink>
          <NavLink to={globalLinkToSignUp()} className={styles.button}>
            Sign up
          </NavLink>
        </>
      )}
    </div>
  );
}
