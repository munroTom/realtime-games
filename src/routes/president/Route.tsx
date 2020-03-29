import React from "react";

import President from "features/president";
import SignedInRoute from "features/auth/components/SignedInRoute";

export default function PresidentRoute() {
  return (
    <SignedInRoute>
      <President />
    </SignedInRoute>
  );
}
