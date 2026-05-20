import { useState, useRef, useEffect } from 'react';
import styles from './../CategoryBoardItem/categoryBoardItem.module.css';
import { TaskBoardItem } from '@features/todolist/components/TaskBoardItem/TaskBoardItem';
import { HiOutlineDotsHorizontal, HiTrash } from 'react-icons/hi';
import { IconButton } from '@ui/index';
import { DropdownMenu } from '@components/index';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';

export const CompletedBoardItem = ({
  tasks,
  handleToggleTaskStatus,
  handleDeleteTask,
  options,
}) => {
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

  const handleDeleteAll = () => {
    tasks.forEach((task) => handleDeleteTask(task.id));
  };

  const handleUncompleteAll = () => {
    tasks.forEach((task) => handleToggleTaskStatus(task.id));
  };

  return (
    <div className={styles.categoryBoardItem}>
      <div className={styles.categoryHeader}>
        <div className={styles.headerCategoryInfo}>
          <span className={styles.categoryName}>Completed</span>
          <div
            style={{
              color:
                tasks.length > 0 ? 'var(--primary-blue)' : 'var(--text-color)',
            }}
          >
            {tasks.length}
          </div>
        </div>
        <div className={styles.categoryBtns}>
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
      <li
        ref={ref}
        className={`${styles.taskBoard} ${hasScroll ? styles.withScroll : ''}`}
      >
        {tasks.map((task, index) => (
          <TaskBoardItem
            key={task.id}
            task={task}
            taskId={task.id}
            handleToggleTaskStatus={handleToggleTaskStatus}
            options={options}
          />
        ))}
      </li>
    </div>
  );
};
