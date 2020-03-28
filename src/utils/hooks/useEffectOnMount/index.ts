// flow
import { useRef, useEffect } from "react";

export default function useEffectOnMount(effect: () => void) {
  const hasMounted = useRef(false);

  useEffect(
    () => {
      if (!hasMounted.current) {
        effect();
        hasMounted.current = true;
      }
    },
    [effect]
  );
}
