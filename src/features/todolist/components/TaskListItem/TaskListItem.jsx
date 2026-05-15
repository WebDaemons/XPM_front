import React, { useState } from 'react';
import { PiDotsSixVertical, MdOutlineDelete, HiFlag } from '@ui/icons';
import { LuFlag } from 'react-icons/lu';
import styles from './taskListItem.module.css';
import { DropDown, Checkbox } from '@ui/index';
import { DatePick } from '@components/index';
import { formatDate } from '@utils/formatDate';
import { useTodolist } from '@features/todolist/hooks/useTodolist';
import { BsCalendar2Check } from 'react-icons/bs';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiDraggable } from 'react-icons/ri';
import { useDraggable } from '@dnd-kit/core';

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
    const updatedTask = {
      ...task,
      priority: option.value,
    };
    handleEditTask(task.id, updatedTask);
  };

  const handleDateChange = (date) => {
    const updatedTask = {
      ...task,
      due_date: date,
    };
    handleEditTask(task.id, updatedTask);
  };

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  });

  return (
    <li
      ref={setNodeRef}
      className={styles.taskListItem}
      style={{
        color: task.is_done ? 'gray' : 'black',
        backgroundColor: isDragging ? 'var(--accent-color)' : '',
      }}
    >
      <div className={styles.taskNav}>
        <div
          {...listeners}
          {...attributes}
          className={styles.dragIcon}
        >
          <RiDraggable />
        </div>
        <div className={styles.checkboxWrapper}>
          <Checkbox
            isChecked={task.is_done}
            onChange={() => handleToggleTaskStatus(task.id)}
          />
        </div>
      </div>

      <div
        className={styles.name}
        style={{ textDecoration: task.is_done ? 'line-through' : 'none' }}
        onClick={onClick}
      >
        {task.name}
      </div>
      {/* <div className={styles.priority}>
        <DropDown
          options={options}
          onOptionSelect={handlePrioritySelect}
          placeholder={getPriorityLabel(task.priority)}
          selectedValue={task.priority}
          icon={HiFlag}
        />
      </div> */}
      <div className={styles.priorityWrapper}>
        {task.priority != 'N' && (
          <div
            className={styles.priority}
            style={{
              color: options.find((flag) => flag.value == task.priority).color,
              backgroundColor: options.find(
                (flag) => flag.value == task.priority,
              ).rgba,
            }}
          >
            <LuFlag />
            {options.find((flag) => flag.value == task.priority).label}
          </div>
        )}
      </div>

      <div className={styles.dueDateWrapper}>
        {' '}
        <div className={styles.dueDate}>
          <BsCalendar2Check />
          <span>{formatDate(task.due_date, 'shortView')}</span>
        </div>
      </div>

      <div className={styles.createdAt}>{formatDate(task.created_at)}</div>
      {/* <div>
        <MdOutlineDelete
          size={16}
          className={styles.deleteIcon}
          onClick={() => {
            handleDeleteTask(taskId);
          }}
        />
      </div> */}
      <button
        className={styles.optionTaskBtn}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.optionIconWrapper}>
          <HiOutlineDotsHorizontal />
        </span>
      </button>
    </li>
  );
};
