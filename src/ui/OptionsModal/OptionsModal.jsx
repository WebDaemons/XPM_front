import React, { useState } from 'react';
import styles from './optionsModal.module.css';
import { FiTrash2, FiEdit3, TfiPinAlt } from '@ui/icons';

export const OptionsModal = ({ isOpen, top, left }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalWrapper}>
      <div
        className={styles.menu}
        style={{ top: top, left: left }}
      >
        <div className={styles.menuItem}>
          <TfiPinAlt
            color="#121212"
            className={styles.pinIcon}
          />
          Pin
        </div>
        <div className={styles.menuItem}>
          <FiEdit3
            color="#121212"
            className={styles.editIcon}
          />
          Edit
        </div>
        <div className={styles.divider}></div>
        <div className={styles.menuItem}>
          <FiTrash2
            color="red"
            className={styles.deleteIcon}
          />
          Delete
        </div>
      </div>
    </div>
  );
};
