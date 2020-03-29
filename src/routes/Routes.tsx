import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import PageLayout from "features/layout/PageLayout";

import PathEndsWithRoute from "features/components/PathEndsWithRoute";
import LoginForm from "features/auth/components/LoginForm";
import SignUpForm from "features/auth/components/SignUpForm";

import { linkToHomePage } from "./links";
import { linkToPresident } from "./president/links";
import PresidentRoute from "./president/Route";
import { linkToLogIn, linkToSignUp } from "./globalLinks";

export default function Routes() {
  return (
    <PageLayout pages={pages}>
      <>
        <PathEndsWithRoute path={linkToLogIn()}>
          <LoginForm />
        </PathEndsWithRoute>
        <PathEndsWithRoute path={linkToSignUp()}>
          <SignUpForm />
        </PathEndsWithRoute>
        <Switch>
          <Route path={linkToPresident()}>
            <PresidentRoute />
          </Route>

          <Route path={linkToHomePage()}>
            I haven't actually made a homepage yet ...
          </Route>
          <Redirect to={linkToHomePage()} />
        </Switch>
      </>
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
