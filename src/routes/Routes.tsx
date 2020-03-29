import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import PageLayout from "features/layout/PageLayout";

import { linkToHomePage } from "./links";
import { linkToPresident } from "./president/links";
import PresidentRoute from "./president/Route";

export default function Routes() {
  return (
    <PageLayout pages={pages}>
      <Switch>
        <Route path={linkToPresident()}>
          <PresidentRoute />
        </Route>

        <Route path={linkToHomePage()}>
          I haven't actually made a homepage yet ...
        </Route>
        <Redirect to={linkToHomePage()} />
      </Switch>
    </PageLayout>
  );
}

const pages = [
  {
    name: "Home",
    link: linkToHomePage()
  },
  { name: "President", link: linkToPresident() }
];
