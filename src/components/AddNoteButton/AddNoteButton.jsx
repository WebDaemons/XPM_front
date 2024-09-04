import React from 'react';
import styles from './addNoteButton.module.css';

export const AddNoteButton = ({ handleClick }) => {
  return (
    <div
      className={styles.addNoteWrapper}
      onClick={handleClick}
    >
      + Add note
    </div>
  );
};
