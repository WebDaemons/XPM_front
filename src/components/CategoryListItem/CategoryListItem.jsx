import React from 'react';
import {
  PiDotsSixVertical,
  MdKeyboardArrowDown,
  RxDotsVertical,
} from '@ui/icons';
import styles from './categoryListItem.module.css';
import { TaskListItem } from '@components/index';

export const CategoryListItem = ({
  categoryElement,
  index,
  rotatedState,
  handleArrowClick,
  getTaskCount,
  handleDeleteCategory,
  handleChecked,
  handleClearPriority,
  handleClearDueDate,
  handleDeleteTask,
  handleOptionSelect,
  options,
}) => {
  const filteredTasks = categoryElement.tasks.filter(
    (task) => task.status === false,
  );

  return (
    <div
      className={styles.categoryListItem}
      key={categoryElement.id}
    >
      <div className={styles.categoryHeader}>
        <PiDotsSixVertical
          size={24}
          color="#121212"
          className={styles.dragIcon}
        />
        <MdKeyboardArrowDown
          size={24}
          color="#121212"
          className={`${styles.showTasksIcon} ${rotatedState ? 'rotated' : ''}`}
          style={{
            transform: rotatedState ? 'rotate(0)' : 'rotate(-90deg)',
          }}
          onClick={() => handleArrowClick(index)}
        />
        <span className={styles.categoryName}>{categoryElement.name}</span>
        <div className={styles.tasksCount}>{filteredTasks.length}</div>
        <RxDotsVertical
          size={20}
          color="#121212"
          style={{ cursor: 'pointer' }}
          onClick={() => handleDeleteCategory(categoryElement.id)}
        />
      </div>
      {rotatedState && (
        <div className={styles.taskList}>
          {!!filteredTasks.length && (
            <div className={styles.taskListHeader}>
              <span style={{ marginLeft: '25px', flexGrow: 1 }}>Task name</span>
              <div className={styles.taskHeaderInfoWrapper}>
                <div className={styles.taskHeaderInfo}>Priority</div>
                <div className={styles.taskHeaderInfo}>Due date</div>
                <div className={styles.taskHeaderInfo}>Created at</div>
              </div>
              <div style={{ width: '16px', height: '16px' }}></div>
            </div>
          )}
          {filteredTasks.map((task, taskIndex) => (
            <TaskListItem
              key={task.id}
              task={task}
              categoryId={categoryElement.id}
              taskIndex={taskIndex}
              handleChecked={handleChecked}
              handleClearPriority={handleClearPriority}
              handleClearDueDate={handleClearDueDate}
              handleDeleteTask={handleDeleteTask}
              handleOptionSelect={handleOptionSelect}
              options={options}
            />
          ))}
        </div>
      )}
    </div>
  );
};
