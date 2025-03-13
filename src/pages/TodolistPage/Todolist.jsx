import React from 'react';
import { Category } from '@components/index';

export default function Todolist() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '25px',
        width: '100%',
        gap: '20px',
        backgroundColor: 'var(--background-color)',
      }}
    >
      <Category />
    </div>
  );
}
