import React from 'react';
import {
  PiDotsSixVertical,
  IoIosClose,
  PiCalendarDotsLight,
  MdOutlineDelete,
} from '@ui/icons';
import styles from './taskListItem.module.css';
import { DropDown, Checkbox } from '@ui/index';

export const TaskListItem = ({
  task,
  taskId,
  handleDeleteTask,
  handleOptionSelect,
  options,
  icon,
}) => (
  // <div
  //   className={styles.taskListItem}
  //   key={task.id}
  // >
  //   <div className={styles.taskNameWrapper}>
  //   </div>
  //   <div className={styles.taskDetails}>
  //     <div className={styles.priority}>
  //       <DropDown
  //         options={options}
  //         icon={icon}
  //       />
  //     </div>
  //   </div>
  // </div>
  <div className={styles.taskListItem}>
    <div>
      <PiDotsSixVertical
        size={16}
        className={styles.dragIcon}
      />
    </div>
    <Checkbox />
    <div className={styles.name}>{task.name}</div>
    <div className={styles.priority}>{task.priority}</div>
    <div className={styles.dueDate}></div>
    <div className={styles.createdAt}>{task.created_at.split('T')[0]}</div>
    <div>
      {' '}
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
