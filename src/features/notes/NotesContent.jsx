import { useState } from 'react';
import { useNotes } from './hooks/useNotes';

import { NotesGrid } from '@features/notes/components/NotesGrid/NotesGrid';
import { NotesToolbar } from '@features/notes/components/NotesToolbar/NotesToolbar';
import { NotesHeader } from '@features/notes/components/NotesHeader/NotesHeader';
import { NoteEditor } from '@features/notes/components/NoteEditor/NoteEditor';
import { NotesWorkspace } from '@features/notes/components/NotesWorkspace/NotesWorkspace';

export const NotesContent = () => {
  const [token] = useState(localStorage.getItem('token'));
  const { notes } = useNotes(token);
  const [selectedNote, setSelectedNote] = useState(null);
  const EMPTY_NOTE = {
    id: null,
    title: '',
    content: '',
    tags: [],
  };

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
      <NotesHeader onCreate={() => setSelectedNote(EMPTY_NOTE)} />
      <NotesToolbar />
      <NotesWorkspace>
        <NotesGrid
          notes={notes}
          onSelectNote={setSelectedNote}
          selectedNote={selectedNote}
          onCreate={() => setSelectedNote(EMPTY_NOTE)}
        />
        {selectedNote && (
          <NoteEditor
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
          />
        )}
      </NotesWorkspace>
    </div>
  );
};
