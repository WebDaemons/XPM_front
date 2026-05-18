import { useState, useRef, useEffect } from 'react';
import styles from './../CategoryBoardItem/categoryBoardItem.module.css';
import { TaskBoardItem } from '@features/todolist/components/TaskBoardItem/TaskBoardItem';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IconButton } from '@ui/index';

export const CompletedBoardItem = ({
  tasks,
  handleToggleTaskStatus,
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
          <IconButton
            icon={HiOutlineDotsHorizontal}
            variant="ghost"
            size="md"
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
