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
  taskId,
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
  >
    <div className={styles.taskNameWrapper}>
      <PiDotsSixVertical
        size={16}
        color="#121212"
        className={styles.dragIcon}
      />
      <input
        type="checkbox"
        style={{ margin: '0 7px' }}
        onClick={() => {
          handleChecked(taskId);
        }}
      />
      <p className={styles.taskName}>{task.name}</p>
    </div>
    <div className={styles.taskDetails}>
      <div className={styles.priority}>
        {task.priority}
        {task.priority ? (
          <IoIosClose
            className={styles.deleteIcon}
            size={20}
            onClick={() => {
              handleClearPriority(taskId);
            }}
          />
        ) : (
          <DropDown
            options={options}
            placeholder=""
            onOptionSelect={(option) =>
              handleOptionSelect(option, categoryId, taskId)
            }
          />
        )}
      </div>
      <div className={styles.due_date}>
        {task.due_date}
        {task.due_date ? (
          <IoIosClose
            className={styles.deleteIcon}
            size={20}
            onClick={() => {
              handleClearDueDate(taskId);
            }}
          />
        ) : (
          <PiCalendarDotsLight
            className={styles.calendarIcon}
            size={20}
          />
        )}
      </div>
      <div className={styles.createdAt}>{task.created_at.split('T')[0]}</div>
    </div>
    <MdOutlineDelete
      size={16}
      color="#121212"
      className={styles.deleteTaskIcon}
      onClick={() => {
        handleDeleteTask(taskId);
      }}
    />
  </div>
);
