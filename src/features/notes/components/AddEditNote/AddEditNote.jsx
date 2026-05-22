import { useNoteForm } from '@features/notes/hooks/useNoteForm';

import { TagManager } from '../TagManager';
import { NoteTools } from '../NoteTools';

import { Button } from '@ui/index';
import styles from './addEditNote.module.css';
import { HiArrowLeft } from 'react-icons/hi';

export const AddEditNote = ({ isOpen, onClose, type, note }) => {
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

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* <div className={styles.modalHeader}>
          <p
            className={styles.modalType}
          >{`${type === 'add' ? 'Add' : 'Edit'} note...`}</p>
        </div> */}
        <div className={styles.modalHeader}>
          <button className={styles.backBtn}>
            <span>
              <HiArrowLeft />
            </span>
            Back
          </button>

          <h3>Edit Note</h3>
        </div>
        <div className={styles.modalBody}>
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
        <div className={styles.modalFooter}>
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
        {/* <div className={styles.modalBody}>
          <div className={styles.modalHeader}>
            <input
              type="text"
              placeholder="Enter title..."
              className={styles.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <NoteTools
              type={type}
              isNotePinned={isNotePinned}
              handlePinned={handlePinned}
              handleDelete={handleDelete}
              handleClose={resetForm}
            />
          </div>

          <textarea
            className={styles.content}
            placeholder="Enter content..."
            rows={7}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <TagManager
            currentTags={currentTags}
            setCurrentTags={setCurrentTags}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div> */}
        {/* <div className={styles.modalFooter}>
          <Button
            variant="outlined"
            onClick={resetForm}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div> */}
      </div>
    </div>
  );
};
