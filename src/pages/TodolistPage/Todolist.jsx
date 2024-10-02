import React from 'react';
import { Category, Toolbar } from '@components/index';
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          startIcon={BsSortUp}
        >
          Filter
        </Button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="outlined"
            startIcon={FiPlus}
          >
            Add Category
          </Button>
          <Button startIcon={FiPlus}>Add Task</Button>
        </div>
      </div>
      <Category />
    </div>
  );
};
