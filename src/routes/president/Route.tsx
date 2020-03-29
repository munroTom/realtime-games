import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { PresidentHomepage, PresidentGame } from "features/president";
import SignedInRoute from "features/auth/components/SignedInRoute";
import { linkToPresidentGame, linkToPresident } from "./links";

export default function PresidentRoute() {
  return (
    <SignedInRoute>
      <Switch>
        <Route path={linkToPresidentGame()}>
          <PresidentGame />
        </Route>
        <Route path={linkToPresident()}>
          <PresidentHomepage linkToGame={linkToPresidentGame} />
        </Route>

        <Redirect to={linkToPresident()} />
      </Switch>
    </SignedInRoute>
  );
}
