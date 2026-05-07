import { useState } from 'react';
import styles from './taskBoardItem.module.css';
import { Checkbox } from '@ui/index';
import { formatDate } from '@utils/formatDate';
import { useTodolist } from '@features/todolist/hooks/useTodolist';
import { LuFlag } from 'react-icons/lu';
import { BsCalendar2Check } from 'react-icons/bs';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useDraggable } from '@dnd-kit/core';

export const TaskBoardItem = ({
  task,
  handleToggleTaskStatus,
  options,
  onClick,
  isOverlay,
}) => {
  const [token] = useState(localStorage.getItem('token'));

  const { handleEditTask, handleDeleteTask } = useTodolist(token);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  });

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={styles.taskBoardItem}
      style={{
        opacity: isDragging ? 0 : 1,
        color: task.is_done ? 'gray' : 'black',
        transform: isOverlay ? 'rotate(2deg)' : '',
      }}
      onClick={isOverlay ? undefined : onClick}
      data-task
    >
      <div className={styles.checkboxWrapper}>
        <Checkbox
          isChecked={task.is_done}
          onChange={() => handleToggleTaskStatus(task.id)}
        />
      </div>
      <div className={styles.taskBody}>
        <div className={styles.taskBodyHeader}>
          <div className={styles.createdAt}>{formatDate(task.created_at)}</div>
          <button
            className={styles.optionTaskBtn}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.optionIconWrapper}>
              <HiOutlineDotsHorizontal />
            </span>
          </button>
        </div>

        <div
          className={styles.name}
          style={{ textDecoration: task.is_done ? 'line-through' : 'none' }}
        >
          {task.name}
        </div>
        <div className={styles.taskInfo}>
          {task.priority != 'N' && (
            <div
              className={styles.priority}
              style={{
                color: options.find((flag) => flag.value == task.priority)
                  .color,
                backgroundColor: options.find(
                  (flag) => flag.value == task.priority,
                ).rgba,
              }}
            >
              <LuFlag />
              {options.find((flag) => flag.value == task.priority).label}
            </div>
          )}

          {task.due_date && (
            <div className={styles.dueDate}>
              <BsCalendar2Check />
              <span>{formatDate(task.due_date, 'shortView')}</span>
            </div>
          )}

          {/* <div className={styles.priority}>
            <span>Priority</span>
            <DropDown
            options={options}
            onOptionSelect={handlePrioritySelect}
            placeholder={getPriorityLabel(task.priority)}
            selectedValue={task.priority}
            icon={HiFlag}
          />
            <span>{task.priority}</span>
          </div>
          <div className={styles.dueDate}>
            <span>Due date</span>
            <DatePick
            onDateChange={handleDateChange}
            defaultDate={task.due_date}
          />
            <span>{formatDate(task.due_date)}</span>
          </div> */}
        </div>
      </div>
      {/* <button
        onClick={() => {
          handleDeleteTask(taskId);
        }}
        className={styles.deleteBtn}
      >
        <span className={styles.deleteIconWrapper}>
          <MdOutlineDelete />
        </span>
      </button> */}
    </li>
  );
};
