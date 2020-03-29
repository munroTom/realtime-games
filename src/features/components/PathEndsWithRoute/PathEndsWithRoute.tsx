import React from "react";
import { useLocation } from "react-router-dom";

type Props = { children: React.ReactElement; path: string };

export default function PathEndsWithRoute({ children, path }: Props) {
  const location = useLocation();

  if (location.pathname.endsWith(path)) {
    return children;
  }
  return null;
}
