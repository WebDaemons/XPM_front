import React from 'react';
import styles from './noteItem.module.css';
// import { TbPinnedFilled } from '@ui/icons';
import { Pin, Ellipsis, Star } from 'lucide-react';
import { adjustBrightness } from '@utils/adjustBrightness';

export const NoteItem = ({ note, onClick }) => {
  const { title, content, createdAt, isPinned, tags } = note;

  function hexToRgba(hex, alpha = 1) {
    let cleanHex = hex.replace('#', '');

    if (cleanHex.length === 3) {
      cleanHex = cleanHex
        .split('')
        .map((char) => char + char)
        .join('');
    }

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <div
      className={styles.noteWrapper}
      onClick={onClick}
    >
      <div className={styles.header}>
        <div className={styles.createdAt}>{createdAt.split('T')[0]}</div>
        <div className={styles.icons}>
          {isPinned && (
            <>
              <Star
                size={20}
                color="#ffbf00"
                fill="#ffbf00"
              />
              <Ellipsis
                size={20}
                color="#787c99"
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.noteBody}>
        <h3 className={styles.noteName}>{title}</h3>
        <p
          className={styles.noteText}
          style={{
            lineClamp: tags.length ? '3' : '5',
            WebkitLineClamp: tags.length ? '3' : '5',
          }}
        >
          {content}
        </p>
      </div>
      <div
        className={styles.tags}
        style={{ display: tags.length ? 'flex' : 'none' }}
      >
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={styles.tag}
            style={{
              // backgroundColor: 'transparent',
              // color: adjustBrightness(tag.color, 100),
              // border: '1px solid',
              color: tag.color,
              backgroundColor: hexToRgba(tag.color, 0.1),
            }}
          >
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
};
