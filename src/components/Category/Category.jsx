import React, { useEffect, useState } from 'react';
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
import { fetchTasks, addTask, removeTask, editTask } from '@slices/taskSlice';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export const Category = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [token] = useState(localStorage.getItem('token'));

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (task) => {
    if (!task.title) return;
    modalType === 'task' ? handleAddTask(task) : handleAddCategory(task);
  };

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
    console.log(taskData.priority);
    dispatch(editTask({ token, taskId, taskData }));
  };

  const handleClearPriority = (taskId) => {
    console.log(taskId);
    handleEditTask(taskId, { priority: null });
  };
  const handleClearDueDate = (taskId) => {
    handleEditTask(taskId, { due_date: '' });
  };

  const handleOptionSelect = (taskId, taskData) => {
    console.log(taskData.value); // Выводит правильное значение
    handleEditTask(taskId, { priority: taskData.value });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const taskId = parseInt(draggableId);
    const newCategoryId = parseInt(destination.droppableId);

    handleEditTask(taskId, { category: newCategoryId });
  };

  // console.log(JSON.stringify(categories, null, 2));
  // console.log(JSON.stringify(tasks, null, 2));

  // EXPERIMENTAL BLOCK

  const handleArrowClick = (index) => {
    const newRotatedStates = [...rotatedStates];
    newRotatedStates[index] = !newRotatedStates[index];
    setRotatedStates(newRotatedStates);
  };

  const getTaskCount = (categoryId) => {
    return tasks.filter((item) => item.category === categoryId).length;
  };

  const options = [
    { value: 'H', label: 'High', color: 'red' },
    { value: 'M', label: 'Medium', color: 'orange' },
    { value: 'L', label: 'Low', color: 'green' },
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

      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.categoryList}>
          {categories.map((category, index) => (
            <Droppable
              droppableId={String(category.id)}
              key={category.id}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <CategoryListItem
                    key={category.id}
                    category={category}
                    tasks={tasks}
                    index={index}
                    rotatedState={rotatedStates[index]}
                    handleArrowClick={handleArrowClick}
                    getTaskCount={getTaskCount}
                    handleDeleteCategory={handleDeleteCategory}
                    // handleChecked={handleChecked}
                    handleClearPriority={handleClearPriority}
                    handleClearDueDate={handleClearDueDate}
                    handleDeleteTask={handleDeleteTask}
                    handleOptionSelect={handleOptionSelect}
                    options={options}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

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
