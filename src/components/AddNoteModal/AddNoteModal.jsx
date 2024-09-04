import React, { useEffect } from 'react';
import styles from './addNoteModal.module.css';
import {
  IoIosClose,
  GoListOrdered,
  GoListUnordered,
  RxUnderline,
  RxFontItalic,
  RxFontBold,
} from '@ui/icons';

export const AddNoteModal = ({ isOpen, onClose }) => {
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
            {/* <div className={styles.textEditBar}>
              <div className={styles.textOptions}>
                <RxUnderline />
                <RxFontItalic />
                <RxFontBold />
              </div>
              <div className={styles.textOrdering}>
                <GoListOrdered />
                <GoListUnordered />
              </div>
            </div> */}
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button className={styles.saveButton}>Save</button>
        </div>
      </div>
    </div>
  );
};
