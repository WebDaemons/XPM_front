import React, { useEffect } from 'react';
import styles from './addEditNote.module.css';
import { IoIosClose } from '@ui/icons';
import { Button } from '@ui/index';

export const AddEditNote = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <p>Add new note...</p>
          <IoIosClose
            color="#121212"
            className={styles.modalClose}
            onClick={onClose}
          />
        </div>
        <div className={styles.modalBody}>
          <div className={styles.noteNameWrapper}>
            <input
              type="text"
              placeholder="Enter name..."
              className={styles.noteName}
            />
          </div>
          <div className={styles.noteTextWrapper}>
            <textarea
              className={styles.textEditor}
              placeholder="Enter text..."
            ></textarea>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button
            variant="outlined"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};
