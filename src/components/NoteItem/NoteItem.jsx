import React, { useState, useRef } from 'react';
import styles from './noteItem.module.css';
import { BiDotsHorizontalRounded, TbPinned, TbPinnedFilled } from '@ui/icons';
import { OptionsModal, Checkbox } from '@ui/index';

export const NoteItem = ({ title, content, createdAt, isPinned, tags }) => {
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
        <div className={styles.createdAt}>{createdAt.split('T')[0]}</div>
        <div className={styles.icons}>
          {isPinned && (
            <TbPinnedFilled
              size={20}
              color="#787c99"
            />
          )}
          <div
            ref={buttonRef}
            onClick={handleButtonClick}
          >
            <BiDotsHorizontalRounded
              size={24}
              color="#787c99"
            />
          </div>
        </div>
      </div>
      <div className={styles.noteBody}>
        <h3 className={styles.noteName}>{title}</h3>
        <p className={styles.noteText}>{content}</p>
      </div>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <div
            key={tag}
            className={styles.tag}
          >
            {tag}
          </div>
        ))}
      </div>
      {/* <OptionsModal
        isOpen={isMenuOpen}
        top={menuPosition.top}
        left={menuPosition.left}
      /> */}
    </div>
  );
};
