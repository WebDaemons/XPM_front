import React, { useState, useRef } from 'react';
import styles from './noteItem.module.css';
import { BiDotsHorizontalRounded } from '@ui/icons';
import { OptionsModal } from '@ui/index';

export const NoteItem = ({ noteName, noteText, createdAt }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const handleButtonClick = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: buttonRect.top + window.scrollY,
        left: buttonRect.left + window.scrollX,
      });
      setIsMenuOpen(true);
    }
  };

  return (
    <div className={styles.noteWrapper}>
      <div className={styles.header}>
        <div className={styles.createdAt}>{createdAt}</div>
        <div
          ref={buttonRef}
          onClick={handleButtonClick}
        >
          <BiDotsHorizontalRounded
            size={24}
            color="#787c99"
            className={styles.optionsIcon}
          />
        </div>
      </div>
      <div className={styles.noteBody}>
        <h3 className={styles.noteName}>{noteName}</h3>
        <p className={styles.noteText}>{noteText}</p>
      </div>
      {/* <div className={styles.tags}></div> */}
      <OptionsModal
        isOpen={isMenuOpen}
        top={menuPosition.top}
        left={menuPosition.left}
      />
    </div>
  );
};
