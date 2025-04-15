import { useState } from 'react';
import { useNotes } from './hooks/useNotes';
import { useModal } from '@hooks/useModal';

import { AddEditNote } from '@features/notes/components/AddEditNote/AddEditNote';
import { NotesList } from '@features/notes/components/NotesList/NotesList';
import { NotesToolBar } from '@features/notes/components/NotesToolBar/NotesToolBar';

export const NotesFeature = () => {
  const [token] = useState(localStorage.getItem('token'));
  const { notes } = useNotes(token);
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <>
      <NotesToolBar
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
      />
      <NotesList notes={notes} />
      <AddEditNote
        isOpen={isModalOpen}
        onClose={handleModalClose}
        type="add"
      />
    </>
  );
};
