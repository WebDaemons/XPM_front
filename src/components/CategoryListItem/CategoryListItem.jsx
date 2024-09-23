import React from 'react';
import {
  PiDotsSixVertical,
  MdKeyboardArrowDown,
  RxDotsVertical,
} from '@ui/icons';
import styles from './categoryListItem.module.css';
import { TaskListItem } from '@components/index';
import { Draggable } from 'react-beautiful-dnd';

export const CategoryListItem = ({
  category,
  tasks,
  index,
  rotatedState,
  handleArrowClick,
  getTaskCount,
  handleDeleteCategory,
  handleDeleteTask,
  options,
}) => {
  return (
    <div className={styles.categoryListItem}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <MdKeyboardArrowDown
            size={24}
            color="#121212"
            className={`${styles.showTasksIcon} ${rotatedState ? 'rotated' : ''}`}
            style={{
              transform: rotatedState ? 'rotate(0)' : 'rotate(-90deg)',
            }}
            onClick={() => handleArrowClick(index)}
          />
          <span className={styles.categoryName}>{category.name}</span>
          <div
            className={`${styles.tasksCount} ${
              getTaskCount(category.id) > 0
                ? styles.tasksExist
                : styles.tasksNotExist
            }`}
          >
            {getTaskCount(category.id)}
          </div>
        </div>
        <div className={styles.headerRight}>
          <RxDotsVertical
            size={20}
            color="#121212"
            style={{ cursor: 'pointer' }}
            onClick={() => handleDeleteCategory(category.id)}
          />
        </div>
      </div>
      {rotatedState && (
        <div className={styles.taskList}>
          {getTaskCount(category.id) !== 0 && (
            <div className={styles.taskListHeader}>
              <span className={styles.taskName}>Name</span>
              <span className={styles.taskPriority}>Priority</span>
              <span className={styles.taskDueDate}>Due date</span>
              <span className={styles.taskCreatedAt}>Created at</span>
            </div>
          )}
          {tasks
            .filter((task) => task.category === category.id)
            .map((task, index) => (
              <Draggable
                draggableId={String(task.id)}
                index={index}
                key={task.id}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskListItem
                      key={task.id}
                      task={task}
                      categoryId={task.category}
                      taskId={task.id}
                      handleDeleteTask={handleDeleteTask}
                      options={options}
                    />
                  </div>
                )}
              </Draggable>
            ))}
        </div>
      )}
    </div>
  );
};
