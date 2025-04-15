import { Button } from '@ui/index';
import { ArrowDownNarrowWide, Plus } from 'lucide-react';

import styles from './notesToolBar.module.css';

export const NotesToolBar = ({ handleModalOpen }) => {
  return (
    <div className={styles.notesToolBarWrapper}>
      <h2>Notes</h2>
      <div className={styles.notesToolBar}>
        <Button
          size="lg"
          startIcon={ArrowDownNarrowWide}
          variant="outlined"
        >
          Filter
        </Button>
        <Button
          size="lg"
          startIcon={Plus}
          onClick={handleModalOpen}
        >
          Create Note
        </Button>
      </div>
    </div>
  );
};
