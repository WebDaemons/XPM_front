import styles from './notesGrid.module.css';
import { NoteItem } from '@features/notes/components/NoteItem/NoteItem';
import { IoMdAdd } from 'react-icons/io';

export const NotesGrid = ({ notes, onSelectNote, selectedNote, onCreate }) => {
  const sortedData = [...notes].sort((a, b) => {
    if (a.isPinned === b.isPinned) {
      return 0;
    }
    return a.isPinned ? -1 : 1;
  });

  return (
    <div className={styles.notesListWrapper}>
      {sortedData.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onClick={() => onSelectNote(note)}
          isActive={selectedNote?.id == note.id}
        />
      ))}
      <button
        className={styles.addNoteBtn}
        onClick={() => onCreate()}
      >
        <span>
          <IoMdAdd />
        </span>
        Add Note
      </button>
    </div>
  );
};
