import React, { useState } from 'react';
import { CategoryInfo } from './category.data';
import styles from './category.module.css';
import { DropDown, Modal } from '@ui/index';
import {
  PiDotsSixVertical,
  PiCalendarDotsLight,
  MdKeyboardArrowDown,
  MdOutlineDelete,
  RxDotsVertical,
  IoIosClose,
} from '@ui/icons';

export const Category = () => {
  const [rotatedStates, setRotatedStates] = useState(
    CategoryInfo.map(() => false),
  );

  const [categoryElements, setCategoryElements] = useState(CategoryInfo);

  const [selectedOption, setSelectedOption] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalType, setModalType] = useState('');

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (task) => {
    modalType === 'task' ? addTask(task) : addCategory(task);

    console.log('task save: ', task.title);
  };

  const addCategory = (task) => {
    if (!task.title) return;
    const newCategory = {
      id:
        categoryElements.length > 0
          ? Math.max(...categoryElements.map((category) => category.id)) + 1
          : 0,
      name: task.title,
      tasks: [],
    };
    setCategoryElements([...categoryElements, newCategory]);
  };

  const handleArrowClick = (index) => {
    const newRotatedStates = [...rotatedStates];
    newRotatedStates[index] = !newRotatedStates[index];
    setRotatedStates(newRotatedStates);
  };

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
  };

  const handleDeleteCategory = (categoryId) => {
    setCategoryElements(
      categoryElements.filter((category) => category.id !== categoryId),
    );
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

  const addTask = (task) => {
    setCategoryElements(
      categoryElements.map((category) => {
        if (category.id === Number(task.category)) {
          const newTask = {
            id: category.tasks.length
              ? category.tasks[category.tasks.length - 1].id + 1
              : 0,
            title: task.title,
            status: '',
            dueDate: task.date,
            createdAt: new Date().toLocaleDateString(),
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

  const handleOptionSelect = (option, categoryId, taskId) => {
    setSelectedOption(option.value);
    setCategoryElements(
      categoryElements.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.map((task) => {
              return task.id === taskId
                ? { ...task, status: selectedOption }
                : task;
            }),
          };
        }
        return category;
      }),
    );
  };

  const handleChecked = (categoryId, taskId) => {
    setCategoryElements(
      categoryElements.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.map((task) => {
              return task.id === taskId
                ? { ...task, status: 'Completed' }
                : task;
            }),
          };
        }
        return category;
      }),
    );
  };

  const options = [
    { value: 'In progress', label: 'In progress' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Completed', label: 'Completed' },
  ];

  const categoryOptions = categoryElements.map((category) => ({
    id: category.id,
    label: category.name,
  }));

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div className={styles.header}>
        <button onClick={() => handleOpenModal('task')}>Add task</button>
        <button onClick={() => handleOpenModal('category')}>
          Add category
        </button>
      </div>
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
                        onClick={() => {
                          handleChecked(categoryElement.id, taskIndex);
                          console.log(categoryElement.id, taskIndex);
                        }}
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
                          <DropDown
                            options={options}
                            placeholder=""
                            onOptionSelect={(option) =>
                              handleOptionSelect(
                                option,
                                categoryElement.id,
                                taskIndex,
                              )
                            }
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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        modalType={modalType}
        categories={categoryOptions}
      />
    </div>
  );
};
