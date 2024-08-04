import React, { useState } from 'react';
import { CategoryInfo } from './category.data';
import styles from './category.module.css';
import { Modal } from '@ui/index';
import { CategoryListItem } from '@components/index';

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

  const handleClearPriority = (categoryId, taskId) => {
    clearField(categoryId, taskId, 'priority');
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
            priority: '',
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
    setCategoryElements(
      categoryElements.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.map((task) => {
              return task.id === taskId
                ? { ...task, priority: 'Completed' }
                : task;
            }),
          };
        }
        return category;
      }),
    );
  };

  const options = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
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
          <CategoryListItem
            key={categoryElement.id}
            categoryElement={categoryElement}
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
