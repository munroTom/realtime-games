import { useState } from "react";

import { useFirebase } from "features/firebase";
import useEffectOnMount from "utils/hooks/useEffectOnMount";

export default function useIsSignedIn() {
  const firebase = useFirebase();
  const [signedIn, setSignedIn] = useState(false);
  useEffectOnMount(() => firebase.user.addSignedInListener(setSignedIn));

  return signedIn;
}
