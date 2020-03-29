import React from "react";
import { useHistory } from "react-router-dom";

import useEffectIfPropChanges from "utils/hooks/useEffectIfPropChanges";
import useIsSignedIn from "features/auth/hooks/useIsSignedIn";
import { globalLinkToLogin } from "routes/globalLinks";
import useEffectOnMount from "utils/hooks/useEffectOnMount";

type Props = { children: React.ReactElement };
export default function SignedInRoute({ children }: Props) {
  useNotSignedInRedirect();
  return children;
}

function useNotSignedInRedirect() {
  const history = useHistory();
  const signedIn = useIsSignedIn();
  useEffectOnMount(() => {
    if (!signedIn) {
      history.replace(globalLinkToLogin());
    }
  });

  useEffectIfPropChanges(() => {
    if (!signedIn) {
      history.replace(globalLinkToLogin());
    }
  }, signedIn);
}
