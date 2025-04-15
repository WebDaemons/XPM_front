import React from 'react';
import styles from './note.module.css';
import { NotesFeature } from '@features/notes/NotesFeature';

export default function Notes() {
  return (
    <div className={styles.notePageWrapper}>
      <NotesFeature />
    </div>
  );
}
