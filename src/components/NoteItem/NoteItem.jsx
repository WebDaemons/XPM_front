import React, { useState, useRef } from 'react';
import styles from './noteItem.module.css';
import { BiDotsHorizontalRounded, TbPinned, TbPinnedFilled } from '@ui/icons';
import { OptionsModal, Checkbox } from '@ui/index';
import { adjustBrightness } from '@utils/adjustBrightness';

export const NoteItem = ({ note, onClick }) => {
  const { title, content, createdAt, isPinned, tags } = note;
  // console.log(note);
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
    <div
      className={styles.noteWrapper}
      onClick={onClick}
    >
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
            key={tag.id}
            className={styles.tag}
            style={{
              backgroundColor: `${tag.color}`,
              color: adjustBrightness(tag.color, -50),
            }}
          >
            {tag.name}
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
