import { Button } from '@ui/index';
import { Plus } from 'lucide-react';

import styles from './notesHeader.module.css';

export const NotesHeader = ({ handleModalOpen }) => {
  return (
    <div className={styles.notesHeaderWrapper}>
      <h2>Notes</h2>
      <div className={styles.notesHeader}>
        <Button
          size="md"
          startIcon={Plus}
          onClick={handleModalOpen}
        >
          Create Note
        </Button>
      </div>
    </div>
  );
};
