import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useFirebase } from "features/firebase";

import { linkToLogIn, linkToSignUp } from "routes/globalLinks";
import useEffectIfPropChanges from "utils/hooks/useEffectIfPropChanges";
import useIsSignedIn from "features/auth/hooks/useIsSignedIn";

import FormTemplate from "../FormTemplate";
export default function LoginForm() {
  const [email, setEmail] = useState("tom@email.com");
  const [password, setPassword] = useState("12345678a");
  const [errorMessage, setErrorMessage] = useState("");

  useRedirectOnSignInSuccess();

  const firebase = useFirebase();
  const onSignInClick = async () => {
    const errorMessage = await firebase.user.login({ email, password });
    setErrorMessage(errorMessage);
  };
  const onSecondaryClick = useOnSecondaryClick();
  return (
    <FormTemplate
      title="Login"
      fields={[
        { label: "Email", type: "email", value: email, setValue: setEmail },
        {
          label: "Password",
          type: "password",
          value: password,
          setValue: setPassword
        }
      ]}
      onClick={onSignInClick}
      errorMessage={errorMessage}
      secondaryText="Sign up"
      onSecondaryClick={onSecondaryClick}
    />
  );
}

function useOnSecondaryClick() {
  const history = useHistory();
  const location = useLocation();

  const withoutSignIn = location.pathname.replace(linkToLogIn(), "");
  return () => history.push(withoutSignIn + linkToSignUp());
}

function useRedirectOnSignInSuccess() {
  const signedIn = useIsSignedIn();
  const history = useHistory();
  const location = useLocation();

  const withoutSignIn = location.pathname.replace(linkToLogIn(), "");
  useEffectIfPropChanges(() => {
    if (signedIn) {
      history.replace(withoutSignIn);
    }
  }, signedIn);
}
