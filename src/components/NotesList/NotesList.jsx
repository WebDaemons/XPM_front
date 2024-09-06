import React, { useState } from 'react';
import styles from './notesList.module.css';
import { NoteItem, AddEditNote, AddNoteButton } from '@components/index';
import { notesData } from './notes.data';

export const NotesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className={styles.notesListWrapper}>
      {notesData.map((note) => (
        <NoteItem
          key={note.id}
          name={note.name}
          value={note.value}
          createdAt={note.createdAt}
          tags={note.tags}
        />
      ))}
      <AddNoteButton handleClick={openModal} />
      <AddEditNote
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};
