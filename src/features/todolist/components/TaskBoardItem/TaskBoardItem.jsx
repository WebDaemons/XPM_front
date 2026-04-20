import { useState } from 'react';
import { PiDotsSixVertical, MdOutlineDelete, HiFlag } from '@ui/icons';
import styles from './taskBoardItem.module.css';
import { DropDown, Checkbox } from '@ui/index';
import { DatePick } from '@components/index';
import { formatDate } from '@utils/formatDate';
import { useTodolist } from '@features/todolist/hooks/useTodolist';
import { LuFlag } from 'react-icons/lu';
import { adjustBrightness } from '@utils/adjustBrightness';
import { BsCalendar2Check } from 'react-icons/bs';

export const TaskBoardItem = ({
  task,
  taskId,
  handleToggleTaskStatus,
  options,
  onClick,
}) => {
  const [token] = useState(localStorage.getItem('token'));

  const { handleEditTask, handleDeleteTask } = useTodolist(token);

  const getPriorityLabel = (value) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : '';
  };

  const handlePrioritySelect = (option) => {
    const updatedTask = {
      ...task,
      priority: option.value,
    };
    handleEditTask(task.id, updatedTask);
  };

  const handleDateChange = (date) => {
    const updatedTask = {
      ...task,
      due_date: date,
    };
    handleEditTask(task.id, updatedTask);
  };

  return (
    <div
      className={styles.taskBoardItem}
      style={{
        color: task.is_done ? 'gray' : 'black',
      }}
    >
      <div className={styles.checkboxWrapper}>
        <Checkbox
          isChecked={task.is_done}
          onChange={() => handleToggleTaskStatus(task.id)}
        />
      </div>
      <div className={styles.taskBody}>
        <div className={styles.createdAt}>{formatDate(task.created_at)}</div>
        <div
          className={styles.name}
          style={{ textDecoration: task.is_done ? 'line-through' : 'none' }}
          onClick={onClick}
        >
          {task.name}
        </div>
        <div className={styles.taskInfo}>
          <div
            className={styles.priority}
            style={{
              color: options.find((flag) => flag.value == task.priority).color,
              backgroundColor: options.find(
                (flag) => flag.value == task.priority,
              ).rgba,
            }}
            // style={{ backgroundColor: adjustBrightness('#ff0000', 50) }}
          >
            <LuFlag />
            {/* {task.priority} */}
            {options.find((flag) => flag.value == task.priority).label}
          </div>
          <div className={styles.dueDate}>
            <BsCalendar2Check />
            <span>{formatDate(task.due_date, 'shortView')}</span>
          </div>
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
      {/* <div>
        <MdOutlineDelete
          size={16}
          className={styles.deleteIcon}
          onClick={() => {
            handleDeleteTask(taskId);
          }}
        />
      </div> */}
    </div>
  );
};
