import { useState, useRef, useEffect } from 'react';
import { MdOutlineDelete } from '@ui/icons';
import styles from './categoryBoardItem.module.css';
import { TaskBoardItem } from '@features/todolist/components/TaskBoardItem/TaskBoardItem';
import { AddEditTodo } from '@features/todolist/components/AddEditTodo/AddEditTodo';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import { useDroppable } from '@dnd-kit/core';
import { IconButton } from '@ui/index';
import { DropdownMenu } from '@components/index';
import { HiTrash, HiPencil, HiOutlineDocumentDuplicate } from 'react-icons/hi';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { AddCategory } from '@features/todolist/components/AddCategory/AddCategory';

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
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleModalOpen = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleCategoryOpen = () => {
    setIsCategoryModalOpen((prev) => !prev);
  };

  const ref = useRef(null);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkScroll = () => {
      setHasScroll(el.scrollHeight > el.clientHeight);
    };

    checkScroll();

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

  const { setNodeRef, isOver } = useDroppable({
    id: category.id,
    data: {
      type: 'category',
    },
  });

  const actionItems = [
    {
      label: 'Edit',
      icon: HiPencil,
      onClick: () => handleCategoryOpen(),
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

  const handleCompleteAll = () => {
    tasks.forEach((task) => {
      if (task.category == category.id) {
        handleToggleTaskStatus(task.id);
      }
    });
  };

  return (
    <div className={styles.categoryBoardItem}>
      <div className={styles.categoryHeader}>
        <div className={styles.headerCategoryInfo}>
          <span className={styles.categoryName}>{category.name}</span>
          <div
            style={{
              color:
                getTaskCount(category.id) > 0
                  ? 'var(--primary-blue)'
                  : 'var(--text-color)',
            }}
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
        <ul
          ref={ref}
          className={`${styles.taskBoard} ${hasScroll ? styles.withScroll : ''}`}
          style={{
            borderRadius: '8px',
            outline: isOver ? '2px dashed var(--primary-blue)' : 'none',
          }}
        >
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
        </ul>
      </div>
      <AddEditTodo
        isOpen={isModalOpen}
        onClose={handleModalClose}
        task={selectedTask}
        type={selectedTask ? 'edit' : 'add'}
        categoryOptions={categoryOptions}
      />
      <AddCategory
        isOpen={isCategoryModalOpen}
        onClose={handleCategoryOpen}
        category={category}
      />
    </div>
  );
};
