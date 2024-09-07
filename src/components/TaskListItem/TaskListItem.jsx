import React from 'react';
import {
  PiDotsSixVertical,
  IoIosClose,
  PiCalendarDotsLight,
  MdOutlineDelete,
} from '@ui/icons';
import styles from './taskListItem.module.css';
import { DropDown, Checkbox } from '@ui/index';

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 'H':
      return 'High';
    case 'M':
      return 'Medium';
    case 'L':
      return 'Low';
    default:
      return 'No priority';
  }
};

export const TaskListItem = ({
  task,
  taskId,
  // handleChecked,
  handleClearPriority,
  handleClearDueDate,
  handleDeleteTask,
  handleOptionSelect,
  options,
  icon,
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
      <div style={{ margin: '0 7px' }}>
        <Checkbox size="md" />
      </div>
      <p className={styles.taskName}>{task.name}</p>
    </div>
    <div className={styles.taskDetails}>
      {/* <div className={styles.priority}>
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
              handleOptionSelect(option,taskId)
            }
          />
        )}
      </div> */}
      {/* <div className={styles.dueDate}>
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
      </div> */}
      <div className={styles.priority}>
        <DropDown
          options={options}
          placeholder={getPriorityLabel(task.priority)}
          onOptionSelect={(option) => handleOptionSelect(taskId, option)}
          icon={icon}
        />
      </div>
      {/* <div className={styles.dueDateInputWrapper}>
        <input
          type="date"
          name="date"
          id="dateInput"
          lang="en-GB"
          className={styles.dueDateInput}
        />
      </div> */}
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
