import { useState } from 'react';
import { MdOutlineDelete } from '@ui/icons';
import styles from './categoryBoardItem.module.css';
import { TaskBoardItem } from '@features/todolist/components/TaskBoardItem/TaskBoardItem';
import { AddEditTodo } from '@features/todolist/components/AddEditTodo/AddEditTodo';

export const CategoryBoardItem = ({
  category,
  tasks,
  index,
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
    <div className={styles.categoryBoardItem}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
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
      <div className={styles.taskList}>
        {tasks
          .filter((task) => task.category === category.id)
          .map((task, index) => (
            <TaskBoardItem
              key={task.id}
              task={task}
              taskId={task.id}
              handleDeleteTask={handleDeleteTask}
              handleToggleTaskStatus={handleToggleTaskStatus}
              options={options}
              onClick={() => handleModalOpen(task)}
            />
          ))}
      </div>
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
