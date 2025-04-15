import { useModal } from '@hooks/useModal';

import styles from './notesList.module.css';

import { NoteItem } from '@features/notes/components/NoteItem/NoteItem';
import { AddEditNote } from '@features/notes/components/AddEditNote/AddEditNote';

export const NotesList = ({ notes }) => {
  const {
    isModalOpen,
    selectedItem: selectedNote,
    handleModalOpen,
    handleModalClose,
  } = useModal();

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
          onClick={() => handleModalOpen(note)}
        />
      ))}
      <div
        className={styles.addNoteButton}
        onClick={() => handleModalOpen()}
      >
        + Add Note
      </div>
      <AddEditNote
        isOpen={isModalOpen}
        onClose={handleModalClose}
        note={selectedNote}
        type={selectedNote ? 'edit' : 'add'}
      />
    </div>
  );
};
