import React from "react";

import Navbar, { Props as NavbarProps } from "../Navbar";

type Props = NavbarProps & { children: React.ReactElement };
export default function PageLayout({ children, pages }: Props) {
  return (
    <>
      <Navbar pages={pages} />
      {children}
    </>
  );
}
