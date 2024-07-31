import React, { useState } from 'react';
import { PiDotsSixVertical } from 'react-icons/pi';
import { MdKeyboardArrowDown, MdOutlineDelete } from 'react-icons/md';
import { RxDotsVertical } from 'react-icons/rx';
import { PiCalendarDotsLight } from 'react-icons/pi';
import { IoIosClose, IoIosAddCircleOutline } from 'react-icons/io';
import styles from './category.module.css';
import { CategoryInfo } from './category.data';

export const Category = () => {
  const [rotatedStates, setRotatedStates] = useState(
    CategoryInfo.map(() => false),
  );

  const handleArrowClick = (index) => {
    const newRotatedStates = [...rotatedStates];
    newRotatedStates[index] = !newRotatedStates[index];
    setRotatedStates(newRotatedStates);
  };

  const [categoryElements, setCategoryElements] = useState(CategoryInfo);

  const clearField = (categoryId, taskId, fieldName) => {
    setCategoryElements(
      categoryElements.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.map((task) => {
              return task.id === taskId ? { ...task, [fieldName]: '' } : task;
            }),
          };
        }
        return category;
      }),
    );
  };

  const handleDeleteTask = (categoryId, taskId) => {
    setCategoryElements(
      categoryElements.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.filter((_, index) => index !== taskId),
          };
        }
        return category;
      }),
    );
    console.log(categoryElements);
  };

  const handleDeleteCategory = (categoryId) => {
    setCategoryElements(
      categoryElements.filter((category) => category.id !== categoryId),
    );
    console.log(categoryElements);
  };

  const getTaskCount = (categoryId) => {
    const category = categoryElements.find((cat) => cat.id === categoryId);
    return category ? category.tasks.length : '0';
  };

  const handleClearStatus = (categoryId, taskId) => {
    clearField(categoryId, taskId, 'status');
  };
  const handleClearDueDate = (categoryId, taskId) => {
    clearField(categoryId, taskId, 'dueDate');
  };

  const addTask = (categoryId, data) => {
    setCategoryElements(
      categoryElements.map((category) => {
        if (category.id === categoryId) {
          const newTask = {
            id: category.tasks.length
              ? category.tasks[category.tasks.length - 1].id + 1
              : 0,
            title: data,
            status: '',
            dueDate: '',
            createdAt: new Date().toISOString().split('T')[0],
          };
          return {
            ...category,
            tasks: [...category.tasks, newTask],
          };
        }
        return category;
      }),
    );
  };

  const handleAddTaskClick = () => {
    const newTaskData = document.getElementById('addTaskInput').value;
    addTask(1, newTaskData);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      <div className={styles.categoryList}>
        {categoryElements.map((categoryElement, index) => (
          <div
            className={styles.categoryListItem}
            key={categoryElement.id}
          >
            <div className={styles.categoryHeader}>
              <PiDotsSixVertical
                size={24}
                color="#121212"
              />
              <MdKeyboardArrowDown
                size={24}
                color="#121212"
                className={`${styles.showTasksIcon} ${rotatedStates[index] ? 'rotated' : ''}`}
                style={{
                  transform: rotatedStates[index]
                    ? 'rotate(0)'
                    : 'rotate(-90deg)',
                }}
                onClick={() => handleArrowClick(index)}
              />
              <span className={styles.categoryName}>
                {categoryElement.name}
              </span>
              <div className={styles.tasksCount}>
                {getTaskCount(categoryElement.id)}
              </div>
              <RxDotsVertical
                size={20}
                color="#121212"
                style={{ cursor: 'pointer' }}
                onClick={() => handleDeleteCategory(categoryElement.id)}
              />
            </div>
            {rotatedStates[index] && (
              <div className={styles.taskList}>
                {!!getTaskCount(categoryElement.id) && (
                  <div className={styles.taskListHeader}>
                    <span style={{ marginLeft: '25px', flexGrow: 1 }}>
                      Task name
                    </span>
                    <div className={styles.taskHeaderInfoWrapper}>
                      <div className={styles.taskHeaderInfo}>Status</div>
                      <div className={styles.taskHeaderInfo}>Due date</div>
                      <div className={styles.taskHeaderInfo}>Created at</div>
                    </div>
                    <div style={{ width: '16px', height: '16px' }}></div>
                  </div>
                )}

                {categoryElement.tasks.map((task, taskIndex) => (
                  <div
                    className={styles.taskListItem}
                    key={task.id}
                  >
                    <div className={styles.taskNameWrapper}>
                      <PiDotsSixVertical
                        size={16}
                        color="#121212"
                        className={styles.dragIcon}
                      />
                      <input
                        type="checkbox"
                        style={{ margin: '0 7px' }}
                      />
                      <p className={styles.taskName}>{task.title}</p>
                    </div>
                    <div className={styles.taskDetails}>
                      <div className={styles.status}>
                        {task.status}
                        {task.status ? (
                          <IoIosClose
                            className={styles.deleteIcon}
                            size={20}
                            onClick={() => {
                              handleClearStatus(categoryElement.id, taskIndex);
                            }}
                          />
                        ) : (
                          <IoIosAddCircleOutline
                            className={styles.addStatusIcon}
                            size={20}
                          />
                        )}
                      </div>
                      <div className={styles.dueDate}>
                        {task.dueDate}
                        {task.dueDate ? (
                          <IoIosClose
                            className={styles.deleteIcon}
                            size={20}
                            onClick={() => {
                              handleClearDueDate(categoryElement.id, taskIndex);
                            }}
                          />
                        ) : (
                          <PiCalendarDotsLight
                            className={styles.calendarIcon}
                            size={20}
                          />
                        )}
                      </div>
                      <div className={styles.createdAt}>{task.createdAt}</div>
                    </div>
                    <MdOutlineDelete
                      size={16}
                      color="#121212"
                      className={styles.deleteTaskIcon}
                      onClick={() => {
                        handleDeleteTask(categoryElement.id, taskIndex);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        id="addTaskInput"
      />
      <input
        type="button"
        value="Add"
        onClick={handleAddTaskClick}
      />
    </div>
  );
};
