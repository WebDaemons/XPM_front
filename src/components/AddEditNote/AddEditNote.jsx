import React, { useEffect, useState } from 'react';
import styles from './addEditNote.module.css';
import { IoIosClose, TbPinnedFilled, MdOutlineDelete } from '@ui/icons';
import { Button } from '@ui/index';
import { HexColorPicker } from 'react-colorful';
import { useNotes } from '@hooks/useNotes';

const YourComponent = () => {
  const [color, setColor] = useState('#aabbcc');
  return (
    <HexColorPicker
      color={color}
      onChange={setColor}
    />
  );
};

export const AddEditNote = ({ isOpen, onClose }) => {
  const [token] = useState(localStorage.getItem('token'));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { handleAddNote } = useNotes(token);

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
    handleAddNote(title, content);
    onClose();
  };

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
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.contentWrapper}>
            <label className={styles.label}>CONTENT</label>
            <textarea
              className={styles.content}
              placeholder="Enter content..."
              rows={10}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.modalTags}>{/* <YourComponent /> */}</div>
        </div>
        <div className={styles.modalFooter}>
          <Button
            variant="outlined"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};
