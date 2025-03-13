import React, { useState, useEffect } from 'react';
import styles from './addCategory.module.css';
import { IoIosClose } from '@ui/icons';
import { Button } from '@ui/index';
import { useTodolist } from '@features/todolist/hooks/useTodolist';

export const AddCategory = ({ isOpen, onClose }) => {
  const [token] = useState(localStorage.getItem('token'));
  const [name, setName] = useState('');
  const { handleAddCategory } = useTodolist(token);

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

  const handleSave = () => {
    if (name === '') return;
    handleAddCategory({ name });
    setName('');
    onClose();
  };

  const handleCloseModal = () => {
    setName('');
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <p className={styles.modalType}>Add category...</p>
          <div className={styles.noteTools}>
            <IoIosClose
              className={styles.navBtn}
              onClick={handleCloseModal}
            />
          </div>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.contentWrapper}>
            <label className={styles.label}>NAME</label>
            <input
              className={styles.content}
              placeholder="Enter name..."
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button
            variant="outlined"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};
