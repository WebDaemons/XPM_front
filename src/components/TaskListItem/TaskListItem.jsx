import React from 'react';
import {
  PiDotsSixVertical,
  IoIosClose,
  PiCalendarDotsLight,
  MdOutlineDelete,
} from '@ui/icons';
import styles from './taskListItem.module.css';
import { DropDown } from '@ui/index';

export const TaskListItem = ({
  task,
  categoryId,
  taskIndex,
  handleChecked,
  handleClearPriority,
  handleClearDueDate,
  handleDeleteTask,
  handleOptionSelect,
  options,
}) => (
  <div
    className={styles.taskListItem}
    key={task.id}
    style={task.priority === 'Completed' ? { color: '#d9d9d9' } : {}}
  >
    <div
      className={styles.taskNameWrapper}
      style={
        task.priority === 'Completed' ? { textDecoration: 'line-through' } : {}
      }
    >
      <PiDotsSixVertical
        size={16}
        color="#121212"
        className={styles.dragIcon}
      />
      <input
        type="checkbox"
        style={{ margin: '0 7px' }}
        onClick={() => {
          handleChecked(categoryId, taskIndex);
        }}
      />
      <p className={styles.taskName}>{task.title}</p>
    </div>
    <div className={styles.taskDetails}>
      <div className={styles.priority}>
        {task.priority}
        {task.priority ? (
          <IoIosClose
            className={styles.deleteIcon}
            size={20}
            onClick={() => {
              handleClearPriority(categoryId, taskIndex);
            }}
          />
        ) : (
          <DropDown
            options={options}
            placeholder=""
            onOptionSelect={(option) =>
              handleOptionSelect(option, categoryId, taskIndex)
            }
          />
        )}
      </div>
      <div className={styles.dueDate}>
        {task.dueDate}
        {task.dueDate ? (
          <IoIosClose
            className={styles.deleteIcon}
            size={20}
            onClick={() => {
              handleClearDueDate(categoryId, taskIndex);
            }}
          />
        ) : (
          <PiCalendarDotsLight
            className={styles.calendarIcon}
            size={20}
          />
        )}
      </div>
      <div className={styles.createdAt}>{task.createdAt}</div>
    </div>
    <MdOutlineDelete
      size={16}
      color="#121212"
      className={styles.deleteTaskIcon}
      onClick={() => {
        handleDeleteTask(categoryId, taskIndex);
      }}
    />
  </div>
);
