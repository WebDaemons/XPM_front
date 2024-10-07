import React, { useState } from 'react';
import {
  PiDotsSixVertical,
  PiCalendarDotsLight,
  MdOutlineDelete,
  HiFlag,
} from '@ui/icons';
import styles from './taskListItem.module.css';
import { DropDown, Checkbox } from '@ui/index';
import { DatePick } from '@components/index';
import { formatDate } from '@utils/formatDate';
import { useTodolist } from '@hooks/useTodolist';

export const TaskListItem = ({
  task,
  taskId,
  handleToggleTaskStatus,
  options,
  onClick,
}) => {
  const [token] = useState(localStorage.getItem('token'));

  const { handleEditTask, handleDeleteTask } = useTodolist(token);

  const getPriorityLabel = (value) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : '';
  };

  const handlePrioritySelect = (option) => {
    console.log(option);
    const updatedTask = {
      ...task,
      priority: option.value,
    };
    handleEditTask(task.id, updatedTask);
  };

  return (
    <div
      className={styles.taskListItem}
      style={{
        color: task.is_done ? 'gray' : 'black',
      }}
    >
      <div>
        <PiDotsSixVertical
          size={16}
          className={styles.dragIcon}
        />
      </div>
      <Checkbox
        isChecked={task.is_done}
        onChange={() => handleToggleTaskStatus(task.id)}
      />
      <div
        className={styles.name}
        style={{ textDecoration: task.is_done ? 'line-through' : 'none' }}
        onClick={onClick}
      >
        {task.name}
      </div>
      <div className={styles.priority}>
        <DropDown
          options={options}
          onOptionSelect={handlePrioritySelect}
          placeholder={getPriorityLabel(task.priority)}
          icon={HiFlag}
        />
      </div>
      <div className={styles.dueDate}>
        <DatePick />
      </div>
      <div className={styles.createdAt}>{formatDate(task.created_at)}</div>
      <div>
        <MdOutlineDelete
          size={16}
          className={styles.deleteIcon}
          onClick={() => {
            handleDeleteTask(taskId);
          }}
        />
      </div>
    </div>
  );
};
