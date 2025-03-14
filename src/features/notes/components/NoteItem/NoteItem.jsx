import React from 'react';
import styles from './noteItem.module.css';
// import { TbPinnedFilled } from '@ui/icons';
import { Pin } from 'lucide-react';
import { adjustBrightness } from '@utils/adjustBrightness';

export const NoteItem = ({ note, onClick }) => {
  const { title, content, createdAt, isPinned, tags } = note;

  return (
    <div
      className={styles.noteWrapper}
      onClick={onClick}
    >
      <div className={styles.header}>
        <div className={styles.createdAt}>{createdAt.split('T')[0]}</div>
        <div className={styles.icons}>
          {isPinned && (
            <Pin
              size={20}
              color="#787c99"
            />
          )}
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
    </div>
  );
};
