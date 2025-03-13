import React from 'react';
import styles from './note.module.css';
import { NotesList } from '@features/notes/components/NotesList/NotesList';

export default function Notes() {
  return (
    <div className={styles.notePageWrapper}>
      <NotesList />
    </div>
  );
}
