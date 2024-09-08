import React, { useEffect } from 'react';
import styles from './addEditNote.module.css';
import { IoIosClose, TbPinnedFilled, MdOutlineDelete } from '@ui/icons';
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
          <IoIosClose
            className={styles.navBtn}
            onClick={onClose}
          />
        </div>
        <div className={styles.modalBody}>
          <div className={styles.titleWrapper}>
            <label className={styles.label}>TITLE</label>
            <input
              type="text"
              placeholder="Enter title..."
              className={styles.title}
            />
          </div>
          <div className={styles.contentWrapper}>
            <label className={styles.label}>CONTENT</label>
            <textarea
              className={styles.content}
              placeholder="Enter content..."
              rows={10}
            ></textarea>
          </div>
          <div className={styles.modalTags}></div>
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
