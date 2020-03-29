import React, { useRef, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.scss";

const ModalContext = React.createContext<any>(null);

type ModalProviderProps = { children: React.ReactElement };
export function ModalProvider({ children }: ModalProviderProps) {
  const modalRef = useRef<any>();
  const [context, setContext] = useState();

  // make sure re-render is triggered after initial
  // render so that modalRef exists
  useEffect(() => {
    setContext(modalRef.current);
  }, []);

  return (
    <div className={styles.container}>
      <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </div>
  );
}

type ModalProps = { children: React.ReactElement };
export function Modal({ children }: ModalProps) {
  const modalNode = useContext(ModalContext);

  return modalNode
    ? ReactDOM.createPortal(
        <div className={styles.overlay}>
          <div className={styles.modal}>{children}</div>
        </div>,
        modalNode
      )
    : null;
}
