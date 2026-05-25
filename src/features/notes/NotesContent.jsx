import { useState } from 'react';
import { useNotes } from './hooks/useNotes';
import { useModal } from '@hooks/useModal';

import { AddEditNote } from '@features/notes/components/AddEditNote/AddEditNote';
import { NotesGrid } from '@features/notes/components/NotesGrid/NotesGrid';
import { NotesToolbar } from '@features/notes/components/NotesToolbar/NotesToolbar';

export const NotesContent = () => {
  const [token] = useState(localStorage.getItem('token'));
  const { notes } = useNotes(token);
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fafcff',
        height: '100svh',
      }}
    >
      <NotesToolbar
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
      />
      <NotesGrid notes={notes} />
      <AddEditNote
        isOpen={isModalOpen}
        onClose={handleModalClose}
        type="add"
      />
      {/* <NotesHeader />
      <NotesToolBar />
      <NotesWorkspace>
        <NotesGrid />
        <NoteEditor />
      </NotesWorkspace> */}
    </div>
  );
};
