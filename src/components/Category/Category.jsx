import React, { useEffect, useState } from 'react';
import { CategoryInfo } from './category.data';
import styles from './category.module.css';
import { Modal } from '@ui/index';
import { CategoryListItem } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  addCategory,
  removeCategory,
  editCategory,
} from '@slices/categorySlice';
import {
  fetchTasks,
  fetchTask,
  addTask,
  removeTask,
  editTask,
} from '@slices/taskSlice';

export const Category = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalType, setModalType] = useState('');

  const [token, setToken] = useState(localStorage.getItem('token'));

  const [categoryElements, setCategories] = useState('');

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (task) => {
    modalType === 'task' ? handleAddTask(task) : handleAddCategory(task);
  };

  // EXPERIMENTAL BLOCK

  const dispatch = useDispatch();
  const {
    categories,
    status: categoriesStatus,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const {
    tasks,
    status: tasksStatus,
    error: tasksError,
  } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchCategories(token));
    dispatch(fetchTasks(token));
  }, [dispatch]);

  const [rotatedStates, setRotatedStates] = useState(
    categories.map(() => false),
  );

  // console.log(rotatedStates);

  // CATEGORY METHODS

  const handleAddCategory = (data) => {
    const categoryData = {
      name: data.title,
    };
    dispatch(addCategory({ token, categoryData }));
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(removeCategory({ token, categoryId }));
  };

  // TASK METHODS

  const handleAddTask = (data) => {
    const taskData = {
      name: data.title,
      category: data.category,
    };
    dispatch(addTask({ token, taskData }));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(removeTask({ token, taskId }));
  };

  const handleEditTask = (taskId, taskData) => {
    console.log(taskData);
    dispatch(editTask({ token, taskId, taskData }));
  };

  const handleClearPriority = (taskId) => {
    console.log(taskId);
    handleEditTask(taskId, { priority: null });
  };
  const handleClearDueDate = (taskId) => {
    handleEditTask(taskId, { due_date: '' });
  };

  // console.log(JSON.stringify(categories, null, 2));
  // console.log(JSON.stringify(tasks, null, 2));

  // EXPERIMENTAL BLOCK

  const handleArrowClick = (index) => {
    const newRotatedStates = [...rotatedStates];
    newRotatedStates[index] = !newRotatedStates[index];
    setRotatedStates(newRotatedStates);
  };

  // const clearField = (categoryId, taskId, fieldName) => {
  //   setCategories(
  //     categories.map((category) => {
  //       if (category.id === categoryId) {
  //         return {
  //           ...category,
  //           tasks: category.tasks.map((task) => {
  //             return task.id === taskId ? { ...task, [fieldName]: '' } : task;
  //           }),
  //         };
  //       }
  //       return category;
  //     }),
  //   );
  // };

  const getTaskCount = (categoryId) => {
    return tasks.filter((item) => item.category === categoryId).length;
  };

  const handleOptionSelect = (option, categoryId, taskId) => {
    setSelectedOption(option.value);
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.map((task) => {
              return task.id === taskId
                ? { ...task, priority: selectedOption }
                : task;
            }),
          };
        }
        return category;
      }),
    );
  };

  const handleChecked = (categoryId, taskId) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.map((task) => {
              return task.id === taskId ? { ...task, status: true } : task;
            }),
          };
        }
        return category;
      }),
    );
  };

  const options = [
    { value: 'High', label: 'High', color: 'red' },
    { value: 'Medium', label: 'Medium', color: 'orange' },
    { value: 'Low', label: 'Low', color: 'green' },
  ];

  const categoryOptions = categories.map((category) => ({
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
        {categories.map((category, index) => (
          <CategoryListItem
            key={category.id}
            category={category}
            tasks={tasks}
            index={index}
            rotatedState={rotatedStates[index]}
            handleArrowClick={handleArrowClick}
            getTaskCount={getTaskCount}
            handleDeleteCategory={handleDeleteCategory}
            handleChecked={handleChecked}
            handleClearPriority={handleClearPriority}
            handleClearDueDate={handleClearDueDate}
            handleDeleteTask={handleDeleteTask}
            handleOptionSelect={handleOptionSelect}
            options={options}
          />
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
