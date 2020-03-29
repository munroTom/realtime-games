// @flow

import { useEffect, useRef } from "react";

export default function useEffectIfPropChanges(effect: () => void, prop: any) {
  const propRef = useRef(prop);

  useEffect(
    () => {
      if (propRef.current !== prop) {
        effect();
        propRef.current = prop;
      }
    },
    [prop, effect]
  );
}
