import React from 'react';
import styles from './todolist.module.css';
import { Category } from '@components/Category/Category';

export const Todolist = () => {
  return (
    <div style={{ display: 'flex', padding: '25px', width: '100%' }}>
      <Category />
    </div>
  );
};
