import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useFirebase } from "features/firebase";

import { linkToLogIn, linkToSignUp } from "routes/globalLinks";
import useEffectIfPropChanges from "utils/hooks/useEffectIfPropChanges";
import useIsSignedIn from "features/auth/hooks/useIsSignedIn";

import FormTemplate from "../FormTemplate";
import useEffectOnMount from "utils/hooks/useEffectOnMount";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [displayName, setDisplayName] = useState("");

  useRedirectOnSignInSuccess();

  const firebase = useFirebase();
  const onSignUpClick = async () => {
    const errorMessage = await firebase.user.signUp({
      email,
      password,
      displayName
    });
    setErrorMessage(errorMessage);
  };

  const onSecondaryClick = useOnSecondaryClick();
  return (
    <FormTemplate
      title={"Sign Up"}
      fields={[
        { label: "Email", type: "email", value: email, setValue: setEmail },
        {
          label: "Password",
          type: "password",
          value: password,
          setValue: setPassword
        },
        {
          label: "Display Name",
          type: "displayName",
          value: displayName,
          setValue: setDisplayName
        }
      ]}
      onClick={onSignUpClick}
      errorMessage={errorMessage}
      secondaryText="Login"
      onSecondaryClick={onSecondaryClick}
    />
  );
}

function useOnSecondaryClick() {
  const history = useHistory();
  const location = useLocation();

  const withoutSignIn = location.pathname.replace(linkToSignUp(), "");
  return () => history.push(withoutSignIn + linkToLogIn());
}

function useRedirectOnSignInSuccess() {
  const signedIn = useIsSignedIn();
  const history = useHistory();
  const location = useLocation();

  const withoutSignUp = location.pathname.replace(linkToSignUp(), "");

  useEffectOnMount(() => {
    if (signedIn) {
      console.log("redirecting");
      history.replace(withoutSignUp);
    }
  });
  useEffectIfPropChanges(() => {
    if (signedIn) {
      console.log("redirecting");

      history.replace(withoutSignUp);
    }
  }, signedIn);
}
