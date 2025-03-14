import React from 'react';
import styles from './addEditNote.module.css';
import { Button } from '@ui/index';
import { useNoteForm } from '@features/notes/hooks/useNoteForm';
import { TagManager } from '../TagManager';
import { NoteTools } from '../NoteTools';

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
        <div className={styles.modalHeader}>
          <p
            className={styles.modalType}
          >{`${type === 'add' ? 'Add' : 'Edit'} note...`}</p>
          <NoteTools
            type={type}
            isNotePinned={isNotePinned}
            handlePinned={handlePinned}
            handleDelete={handleDelete}
            handleClose={resetForm}
          />
        </div>
        <div className={styles.modalBody}>
          <input
            type="text"
            placeholder="Enter title..."
            className={styles.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
        </div>
        <div className={styles.modalFooter}>
          <Button
            variant="outlined"
            onClick={resetForm}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};
