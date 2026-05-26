import { useState } from 'react';
import { useNotes } from './hooks/useNotes';
import { useModal } from '@hooks/useModal';

import { AddEditNote } from '@features/notes/components/AddEditNote/AddEditNote';
import { NotesGrid } from '@features/notes/components/NotesGrid/NotesGrid';
import { NotesToolbar } from '@features/notes/components/NotesToolbar/NotesToolbar';
import { NotesHeader } from '@features/notes/components/NotesHeader/NotesHeader';
import { NoteEditor } from '@features/notes/components/NoteEditor/NoteEditor';
import { NotesWorkspace } from '@features/notes/components/NotesWorkspace/NotesWorkspace';

export const NotesContent = () => {
  const [token] = useState(localStorage.getItem('token'));
  const { notes } = useNotes(token);
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fafcff',
        height: '100svh',
        overflowY: 'hidden',
      }}
    >
      {
        // <AddEditNote
        //   isOpen={isModalOpen}
        //   onClose={handleModalClose}
        //   type="add"
        // />
      }
      <NotesHeader handleModalOpen={handleModalOpen} />
      {/* <NotesToolbar /> */}
      <NotesWorkspace>
        <NotesGrid
          notes={notes}
          onSelectNote={setSelectedNote}
        />
        {selectedNote && <NoteEditor />}
      </NotesWorkspace>
    </div>
  );
};
