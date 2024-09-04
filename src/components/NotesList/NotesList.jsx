import React, { useState } from 'react';
import styles from './notesList.module.css';
import { NoteItem, AddNoteButton, AddNoteModal } from '@components/index';
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
          noteName={note.name}
          noteText={note.text}
          createdAt={note.createdAt}
        />
      ))}
      <AddNoteButton handleClick={openModal} />
      <AddNoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};
