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
import { DatePick } from '@components/index';

export const TaskListItem = ({
  task,
  taskId,
  handleDeleteTask,
  handleOptionSelect,
  handleToggleTaskStatus,
  options,
}) => (
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
    >
      {task.name}
    </div>
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
    <div className={styles.dueDate}>{/* <DatePick /> */}</div>
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
