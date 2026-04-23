// import styles from './completedBoardItem.module.css';
import styles from './../CategoryListItem/categoryListItem.module.css';
import { TaskBoardItem } from '@features/todolist/components/TaskBoardItem/TaskBoardItem';

export const CompletedBoardItem = ({
  tasks,
  handleToggleTaskStatus,
  options,
}) => {
  return (
    <div className={styles.categoryListItem}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.categoryName}>Completed</span>
        </div>
      </div>

      <div className={styles.taskList}>
        {tasks.length !== 0 && (
          <div className={styles.taskListHeader}>
            <span className={styles.taskName}>Name</span>
            <span className={styles.taskPriority}>Priority</span>
            <span className={styles.taskDueDate}>Due date</span>
            <span className={styles.taskCreatedAt}>Created at</span>
          </div>
        )}
        {tasks.map((task) => (
          <TaskBoardItem
            key={task.id}
            task={task}
            categoryId={task.category}
            taskId={task.id}
            handleToggleTaskStatus={handleToggleTaskStatus}
            options={options}
          />
        ))}
      </div>
    </div>
  );
};
