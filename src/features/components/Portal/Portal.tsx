import React from "react";
import { createPortal } from "react-dom";
import usePortal from "./hooks";

type Props = { id: string; children: React.ReactElement };
export default function Portal({ id, children }: Props) {
  const target = usePortal(id);
  return createPortal(
    children,
    //@ts-ignore
    target
  );
}
