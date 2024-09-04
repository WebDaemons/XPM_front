import React from 'react';
import { NotesList } from '@components/index';

export const Notes = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '25px',
        width: '100%',
      }}
    >
      <NotesList />
    </div>
  );
};
