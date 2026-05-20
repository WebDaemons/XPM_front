import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineDelete } from '@ui/icons';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import styles from './categoryListItem.module.css';
import { TaskListItem } from '@features/todolist/components/TaskListItem/TaskListItem';
import { AddEditTodo } from '@features/todolist/components/AddEditTodo/AddEditTodo';
import { useDroppable } from '@dnd-kit/core';
import { IconButton } from '@ui/index';
import { DropdownMenu } from '@components/index';
import { HiTrash, HiPencil, HiOutlineDocumentDuplicate } from 'react-icons/hi';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';

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

  const { setNodeRef, isOver } = useDroppable({
    id: category.id,
    data: {
      type: 'category',
    },
  });

  const handleCompleteAll = () => {
    tasks.forEach((task) => {
      if (task.category == category.id) {
        handleToggleTaskStatus(task.id);
      }
    });
  };

  const actionItems = [
    {
      label: 'Edit',
      icon: HiPencil,
      onClick: () => console.log('edit'),
    },
    {
      label: 'Complete all',
      icon: IoCheckmarkDoneSharp,
      onClick: () => handleCompleteAll(),
    },
    {
      label: 'Delete',
      icon: HiTrash,
      danger: true,
      onClick: () => handleDeleteCategory(category.id),
    },
  ];

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
        <div className={styles.categoryBtns}>
          <IconButton
            icon={IoMdAdd}
            variant="ghost"
            size="md"
            onClick={() => handleModalOpen()}
          />
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
      </div>
      <div ref={setNodeRef}>
        {rotatedState && (
          <ul className={styles.taskList}>
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
              .map((task) => (
                <TaskListItem
                  key={task.id}
                  task={task}
                  taskId={task.id}
                  handleDeleteTask={handleDeleteTask}
                  handleToggleTaskStatus={handleToggleTaskStatus}
                  options={options}
                  onClick={() => handleModalOpen(task)}
                />
              ))}
          </ul>
        )}
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
