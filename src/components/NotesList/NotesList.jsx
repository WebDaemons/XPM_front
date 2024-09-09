import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './notesList.module.css';
import { NoteItem, AddEditNote } from '@components/index';
import { notesData } from './notes.data';
import { fetchNotes, addNote, removeNote, editNote } from '@slices/noteSlice';

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

  const dispatch = useDispatch();
  const {
    notes,
    status: notesStatus,
    error: notesError,
  } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes(token));
  }, [dispatch]);

  const handleAddNote = (data) => {
    const noteData = {
      title: data.title,
      value: data.value,
      tags: data.tags,
    };
    dispatch(addNote({ token, noteData }));
  };

  const handleDeleteNote = (noteId) => {
    dispatch(removeNote({ token, noteId }));
  };

  const handleEditNote = (noteData, noteId) => {
    dispatch(editNote({ token, noteData, noteId }));
  };

  // WORK WITH API

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
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
        onClick={openModal}
      >
        + Add Note
      </div>
      <AddEditNote
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};
