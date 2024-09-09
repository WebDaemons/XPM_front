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
  handleChecked,
  handleClearPriority,
  handleClearDueDate,
  handleDeleteTask,
  handleOptionSelect,
  options,
}) => {
  return (
    <div
      className={styles.categoryListItem}
      key={category.id}
    >
      <div className={styles.categoryHeader}>
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
        <div className={styles.tasksCount}>{getTaskCount(category.id)}</div>
        <RxDotsVertical
          size={20}
          color="#121212"
          style={{ cursor: 'pointer' }}
          onClick={() => handleDeleteCategory(category.id)}
        />
      </div>
      {rotatedState && (
        <div className={styles.taskList}>
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
                      handleChecked={handleChecked}
                      handleClearPriority={handleClearPriority}
                      handleClearDueDate={handleClearDueDate}
                      handleDeleteTask={handleDeleteTask}
                      handleOptionSelect={handleOptionSelect}
                      options={options}
                    />
                  </div>
                )}
              </Draggable>
            ))}
        </div>
      )}
      {/* {rotatedState && (
        <div className={styles.taskList}>

          {tasks.map(
            (task) =>
              task.category === category.id && (
                <TaskListItem
                  key={task.id}
                  task={task}
                  categoryId={task.category}
                  taskId={task.id}
                  handleChecked={handleChecked}
                  handleClearPriority={handleClearPriority}
                  handleClearDueDate={handleClearDueDate}
                  handleDeleteTask={handleDeleteTask}
                  handleOptionSelect={handleOptionSelect}
                  options={options}
                />
              ),
          )}
        </div>
      )} */}
    </div>
  );
};
