import React, { useState } from 'react';
import { MdKeyboardArrowDown } from '@ui/icons';
import styles from './todoTrashItem.module.css';
import { TaskListItem } from '@features/todolist/components/TaskListItem/TaskListItem';
import { IconButton } from '@ui/index';
import { DropdownMenu } from '@components/index';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { HiOutlineDotsHorizontal, HiTrash } from 'react-icons/hi';

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

  const handleDeleteAll = () => {
    tasks.forEach((task) => handleDeleteTask(task.id));
  };

  const handleUncompleteAll = () => {
    tasks.forEach((task) => handleToggleTaskStatus(task.id));
  };

  const actionItems = [
    {
      label: 'Uncomplete all',
      icon: IoCheckmarkDoneSharp,
      onClick: () => handleUncompleteAll(),
    },
    {
      label: 'Delete all',
      icon: HiTrash,
      danger: true,
      onClick: () => handleDeleteAll(),
    },
  ];

  return (
    <div className={styles.categoryListItem}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <MdKeyboardArrowDown
            size={24}
            color="var(--primamy-color)"
            className={`${styles.showTasksIcon} ${rotatedState ? 'rotated' : ''}`}
            style={{
              transform: isCollapsed ? 'rotate(0)' : 'rotate(-90deg)',
            }}
            onClick={handleArrowClick}
          />
          <div className={styles.headerCategoryInfo}>
            <span className={styles.categoryName}>Completed</span>
            <div
              className={styles.tasksCount}
              style={{
                color:
                  tasks.length > 0
                    ? 'var(--primary-blue)'
                    : 'var(--text-color)',
              }}
            >
              {tasks.length}
            </div>
          </div>
        </div>
        <DropdownMenu
          trigger={
            <IconButton
              icon={HiOutlineDotsHorizontal}
              variant="ghost"
              size="md"
            />
          }
          items={actionItems}
        />
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
