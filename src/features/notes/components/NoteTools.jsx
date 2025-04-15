import { X, Pin, PinOff, Trash, Star } from 'lucide-react';
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
          <Star
            // className={styles.navBtn}
            color="#ffbf00"
            fill="#ffbf00"
            onClick={handlePinned}
          />
        ) : (
          <Star
            // className={styles.navBtn}
            onClick={handlePinned}
            color="var(--text-color)"
          />
          //   <PinOff
          //     className={styles.navBtn}
          //     onClick={handlePinned}
          //   />
          // ) : (
          //   <Pin
          //     className={styles.navBtn}
          //     onClick={handlePinned}
          //   />
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
