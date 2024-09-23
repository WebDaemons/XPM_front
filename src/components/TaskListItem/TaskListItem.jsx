import React from 'react';
import {
  PiDotsSixVertical,
  IoIosClose,
  PiCalendarDotsLight,
  MdOutlineDelete,
  HiOutlineFlag,
} from '@ui/icons';
import styles from './taskListItem.module.css';
import { DropDown, Checkbox } from '@ui/index';

export const TaskListItem = ({
  task,
  taskId,
  handleDeleteTask,
  handleOptionSelect,
  options,
}) => (
  <div className={styles.taskListItem}>
    <div>
      <PiDotsSixVertical
        size={16}
        className={styles.dragIcon}
      />
    </div>
    <Checkbox />
    <div className={styles.name}>{task.name}</div>
    <div className={styles.priority}>
      <DropDown options={options} />
      <IoIosClose
        size={20}
        className={styles.clearIcon}
      />
      {/* <HiOutlineFlag
        className={styles.setPriorityIcon}
        color="#787c99"
      /> */}
    </div>
    <div className={styles.dueDate}></div>
    <div className={styles.createdAt}>{task.created_at.split('T')[0]}</div>
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
