import React, { useState } from 'react';
import {
  PiDotsSixVertical,
  MdKeyboardArrowDown,
  RxDotsVertical,
} from '@ui/icons';
import styles from './todoTrashItem.module.css';
import { TaskListItem } from '@components/index';

export const TodoTrashItem = ({
  tasks,
  rotatedState,
  handleDeleteTask,
  handleToggleTaskStatus,
  options,
}) => {
  const handleArrowClick = () => {
    setIsCollapsed((prev) => !prev);
  };

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.categoryListItem}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <MdKeyboardArrowDown
            size={24}
            color="#121212"
            className={`${styles.showTasksIcon} ${rotatedState ? 'rotated' : ''}`}
            style={{
              transform: isCollapsed ? 'rotate(0)' : 'rotate(-90deg)',
            }}
            onClick={handleArrowClick}
          />
          <span className={styles.categoryName}>Completed</span>
        </div>
      </div>
      {isCollapsed && (
        <div className={styles.taskList}>
          {tasks.length !== 0 && (
            <div className={styles.taskListHeader}>
              <span className={styles.taskName}>Name</span>
              <span className={styles.taskPriority}>Priority</span>
              <span className={styles.taskDueDate}>Due date</span>
              <span className={styles.taskCreatedAt}>Created at</span>
            </div>
          )}
          {tasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              categoryId={task.category}
              taskId={task.id}
              handleDeleteTask={handleDeleteTask}
              handleToggleTaskStatus={handleToggleTaskStatus}
              options={options}
            />
          ))}
        </div>
      )}
    </div>
  );
};
