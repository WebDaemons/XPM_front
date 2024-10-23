import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineDelete } from '@ui/icons';
import styles from './categoryListItem.module.css';
import { TaskListItem, AddEditTodo } from '@components/index';
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
  handleToggleTaskStatus,
  options,
  categoryOptions,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleModalOpen = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.categoryListItem}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <MdKeyboardArrowDown
            size={24}
            color="var(--primary-color)"
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
          <MdOutlineDelete
            size={20}
            // color="#121212"
            className={styles.deleteCategoryIcon}
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
                      taskId={task.id}
                      handleDeleteTask={handleDeleteTask}
                      handleToggleTaskStatus={handleToggleTaskStatus}
                      options={options}
                      onClick={() => handleModalOpen(task)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
        </div>
      )}
      <AddEditTodo
        isOpen={isModalOpen}
        onClose={handleModalClose}
        task={selectedTask}
        type={selectedTask ? 'edit' : 'add'}
        categoryOptions={categoryOptions}
      />
    </div>
  );
};
