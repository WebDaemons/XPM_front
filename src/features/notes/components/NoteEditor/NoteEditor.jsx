import { useNoteForm } from '@features/notes/hooks/useNoteForm';
import { TagManager } from '../TagManager/TagManager';
import { NoteTools } from '../NoteTools';

import { Button } from '@ui/index';
import styles from './noteEditor.module.css';
import { HiArrowLeft } from 'react-icons/hi';

export const NoteEditor = ({ onClose, note }) => {
  const {
    title,
    setTitle,
    content,
    setContent,
    currentTags,
    setCurrentTags,
    isNotePinned,
    handleSave,
    handlePinned,
    handleDelete,
    resetForm,
  } = useNoteForm(note, onClose);

  return (
    <div className={styles.noteEditor}>
      <div className={styles.editorHeader}>
        <button
          className={styles.backBtn}
          onClick={onClose}
        >
          <span>
            <HiArrowLeft />
          </span>
          Back
        </button>

        <h3>{note.id ? 'Edit note' : 'Create note'}</h3>
      </div>
      <div className={styles.editorBody}>
        <input
          type="text"
          placeholder="Name your note..."
          className={styles.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={styles.content}
          placeholder="Start writing..."
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.editorFooter}>
        <TagManager
          currentTags={currentTags}
          setCurrentTags={setCurrentTags}
        />
        <div className={styles.footerBtns}>
          <Button
            onClick={onClose}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};
