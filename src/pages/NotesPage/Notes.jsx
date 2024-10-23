import React from 'react';
import styles from './note.module.css';
import { NotesList } from '@components/index';

export const Notes = () => {
  return (
    <div className={styles.notePageWrapper}>
      <NotesList />
    </div>
  );
};
