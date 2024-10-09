import React from 'react';
import { Category, Toolbar, AddEditTodo } from '@components/index';
import { Button } from '@ui/index';
import { FiPlus, BsSortUp, TbLayoutDashboard, FiList } from '@ui/icons';

export const Todolist = () => {
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
      <Category />
    </div>
  );
};
