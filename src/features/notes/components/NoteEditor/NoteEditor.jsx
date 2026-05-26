import { useNoteForm } from '@features/notes/hooks/useNoteForm';

import { TagManager } from '../TagManager';
import { NoteTools } from '../NoteTools';

import { Button } from '@ui/index';
import styles from './noteEditor.module.css';
import { HiArrowLeft } from 'react-icons/hi';

export const NoteEditor = ({ isOpen, onClose, type, note }) => {
  const {
    title,
    setTitle,
    content,
    setContent,
    currentTags,
    setCurrentTags,
    selectedColor,
    setSelectedColor,
    isNotePinned,
    handleSave,
    handlePinned,
    handleDelete,
    resetForm,
  } = useNoteForm(note, type, onClose);

  // if (!isOpen) return null;

  return (
    <div className={styles.noteEditor}>
      <div className={styles.editorHeader}>
        <button className={styles.backBtn}>
          <span>
            <HiArrowLeft />
          </span>
          Back
        </button>

        <h3>Edit Note</h3>
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
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.editorFooter}>
        <TagManager
          currentTags={currentTags}
          setCurrentTags={setCurrentTags}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <div className={styles.footerBtns}>
          <Button
            onClick={resetForm}
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
