import React from "react";

import { Modal } from "features/components/Modal";

import styles from "./FormTemplate.module.scss";

type FormField = {
  label: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
};

type Props = {
  title: string;
  fields: Array<FormField>;
  errorMessage: string;
  onClick: () => void;
  onSecondaryClick: () => void;
  secondaryText: string;
};
export default function FormWrapper({
  title,
  fields,
  errorMessage,
  onClick,
  onSecondaryClick,
  secondaryText
}: Props) {
  return (
    <Modal>
      <div className={styles.wrapper}>
        <h3>{title}</h3>
        <form>
          {fields.map(({ type, value, setValue, label }) => {
            return (
              <React.Fragment key={label}>
                <label>{label}:</label>
                <input
                  type={type}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                />
              </React.Fragment>
            );
          })}
        </form>
        <div className={styles.error}>{errorMessage}</div>
        <div>
          <button onClick={onClick}>{title}</button>
          <button onClick={onSecondaryClick}>{secondaryText}</button>
        </div>
      </div>
    </Modal>
  );
}
