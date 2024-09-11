import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './notesList.module.css';
import { NoteItem, AddEditNote } from '@components/index';
import { notesData } from './notes.data';
import { fetchNotes } from '@slices/noteSlice';
import { useNotes } from '@hooks/useNotes';

export const NotesList = () => {
  const [token] = useState(localStorage.getItem('token'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sortedData = notesData.sort((a, b) => {
    if (a.isPinned === b.isPinned) {
      return 0;
    }
    return a.isPinned ? -1 : 1;
  });

  // WORK WITH API

  // const dispatch = useDispatch();
  // const {
  //   notes,
  //   status: notesStatus,
  //   error: notesError,
  // } = useSelector((state) => state.notes);

  // useEffect(() => {
  //   dispatch(fetchNotes(token));
  // }, [dispatch]);

  // const { handleAddNote, handleDeleteNote, handleEditNote } = useNotes(token);

  // WORK WITH API

  return (
    <div className={styles.notesListWrapper}>
      {sortedData.map((note) => (
        <NoteItem
          key={note.id}
          title={note.title}
          content={note.content}
          createdAt={note.createdAt}
          tags={note.tags}
          isPinned={note.isPinned}
        />
      ))}
      <div
        className={styles.addNoteButton}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        + Add Note
      </div>
      <AddEditNote
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      />
    </div>
  );
};
