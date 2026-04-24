import styles from './../CategoryBoardItem/categoryBoardItem.module.css';
import { TaskBoardItem } from '@features/todolist/components/TaskBoardItem/TaskBoardItem';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

export const CompletedBoardItem = ({
  tasks,
  handleToggleTaskStatus,
  options,
}) => {
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
          <button className={styles.categoryOptionsBtn}>
            <span className={styles.iconWrapper}>
              <HiOutlineDotsHorizontal />
            </span>
          </button>
        </div>
      </div>
      <div className={styles.taskBoard}>
        {tasks.map((task, index) => (
          <TaskBoardItem
            key={task.id}
            task={task}
            taskId={task.id}
            handleToggleTaskStatus={handleToggleTaskStatus}
            options={options}
          />
        ))}
      </div>
    </div>
  );
};
