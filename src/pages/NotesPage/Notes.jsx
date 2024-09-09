import React from 'react';
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
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="outlined"
            startIcon={BsSortUp}
          >
            Filter
          </Button>
          <Button startIcon={FiPlus}>Add Note</Button>
        </div>
      </div>
      <NotesList />
    </div>
  );
};
