import React from "react";
import { NavLink } from "react-router-dom";
import AuthenticationButtons from "./components/AuthenticationButtons";

import styles from "./Navbar.module.scss";

type Page = { name: string; link: string };

export type Props = { pages: Array<Page> };
export default function Navbar({ pages }: Props) {
  return (
    <div className={styles.wrapper}>
      {pages.map(({ name, link }) => {
        return (
          <NavLink to={link} className={styles.link}>
            {name}
          </NavLink>
        );
      })}
      <AuthenticationButtons className={styles.authButtons} />
    </div>
  );
}
