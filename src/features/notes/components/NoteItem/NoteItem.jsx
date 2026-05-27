import styles from './noteItem.module.css';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { hexToRgba } from '@utils/hexToRgba';
import { DropdownMenu } from '@components/index';
import { IconButton } from '@ui/index';
import {
  HiTrash,
  HiPencil,
  HiOutlineDocumentDuplicate,
  HiOutlineDotsHorizontal,
} from 'react-icons/hi';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useNotes } from '@features/notes/hooks/useNotes';
import { useNoteForm } from '@features/notes/hooks/useNoteForm';
import { formatDate } from '@utils/formatDate';
import { isAction } from '@reduxjs/toolkit';

export const NoteItem = ({ note, onClick, isActive }) => {
  const { title, content, createdAt, isPinned, tags } = note;
  const [token] = useState(localStorage.getItem('token'));

  const { handleDeleteNote, handleDuplicateNote } = useNotes(token);
  const { handlePinned } = useNoteForm(note, 'edit');

  const actionItems = [
    {
      label: isPinned ? 'Unpin' : 'Pin',
      icon: isPinned ? FaStar : FaRegStar,
      warning: true,
      onClick: () => handlePinned(),
    },
    {
      label: 'Edit',
      icon: HiPencil,
      onClick: () => onClick(),
    },
    {
      label: 'Duplicate',
      icon: HiOutlineDocumentDuplicate,
      onClick: () => handleDuplicateNote(note),
    },
    {
      type: 'divider',
    },
    {
      label: 'Delete',
      icon: HiTrash,
      danger: true,
      onClick: () => handleDeleteNote(note.id),
    },
  ];

  return (
    <div
      className={styles.noteWrapper}
      onClick={onClick}
      style={{ border: isActive ? '2px solid var(--primary-blue)' : '' }}
    >
      <div className={styles.header}>
        <div className={styles.createdAt}>
          {formatDate(createdAt, 'longView')}
        </div>
        {isPinned && (
          <span className={styles.favoriteIcon}>
            <Star />
          </span>
        )}
        <DropdownMenu
          trigger={
            <IconButton
              icon={HiOutlineDotsHorizontal}
              variant="ghost"
              size="md"
            />
          }
          items={actionItems}
        />
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
