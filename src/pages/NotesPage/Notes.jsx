import React from 'react';
import styles from './note.module.css';
import { NotesList, Toolbar } from '@components/index';
import { Button } from '@ui/index';
import { FiPlus, BsSortUp } from '@ui/icons';

export const Notes = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '25px',
        width: '100%',
        gap: '20px',
      }}
    >
      {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          startIcon={BsSortUp}
        >
          Filter
        </Button>
        <div className={styles.addButton}>
          <Button startIcon={FiPlus}>Add Note</Button>
        </div>
      </div>{' '}
      */}
      <NotesList />
    </div>
  );
};
