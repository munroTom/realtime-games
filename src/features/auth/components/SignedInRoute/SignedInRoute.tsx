import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import useEffectIfPropChanges from "utils/hooks/useEffectIfPropChanges";
import useIsSignedIn from "features/auth/hooks/useIsSignedIn";
import { linkToLogIn, linkToSignUp } from "routes/globalLinks";
import useEffectOnMount from "utils/hooks/useEffectOnMount";

type Props = { children: React.ReactElement };
export default function SignedInRoute({ children }: Props) {
  useNotSignedInRedirect();
  return children;
}

function useNotSignedInRedirect() {
  const history = useHistory();
  const signedIn = useIsSignedIn();
  const location = useLocation();
  let currentPath = location.pathname;
  if (currentPath.endsWith("/")) {
    currentPath = currentPath.substring(0, currentPath.length - 1);
  }

  const endsWithAuthRoute =
    currentPath.endsWith(linkToLogIn()) || currentPath.endsWith(linkToSignUp());
  useEffectOnMount(() => {
    if (!signedIn && !endsWithAuthRoute) {
      history.replace(currentPath + linkToLogIn());
    }
  });

  useEffectIfPropChanges(() => {
    if (!signedIn && !endsWithAuthRoute) {
      history.replace(currentPath + linkToLogIn());
    }
  }, signedIn);
}
