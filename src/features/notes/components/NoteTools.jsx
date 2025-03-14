import { X, Pin, PinOff, Trash } from 'lucide-react';
import styles from './AddEditNote/addEditNote.module.css';

export const NoteTools = ({
  type,
  isNotePinned,
  handlePinned,
  handleDelete,
  handleClose,
}) => (
  <div className={styles.noteTools}>
    {type === 'edit' ? (
      <>
        {isNotePinned ? (
          <PinOff
            className={styles.navBtn}
            onClick={handlePinned}
          />
        ) : (
          <Pin
            className={styles.navBtn}
            onClick={handlePinned}
          />
        )}
        <Trash
          className={styles.navBtn}
          onClick={handleDelete}
        />
        <X
          className={styles.navBtn}
          onClick={handleClose}
        />
      </>
    ) : (
      <X
        className={styles.navBtn}
        onClick={handleClose}
      />
    )}
  </div>
);
