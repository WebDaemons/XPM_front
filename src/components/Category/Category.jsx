import React, { useEffect, useState } from 'react';
import styles from './category.module.css';
import { Modal } from '@ui/index';
import { CategoryListItem } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@slices/categorySlice';
import { fetchTasks } from '@slices/taskSlice';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useTodolist } from '@hooks/useTodolist';

export const Category = () => {
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

  const checkedTasks = tasks.filter((task) => task.is_done);

  const [rotatedStates, setRotatedStates] = useState(
    categories.map(() => false),
  );

  // CATEGORY METHODS

  const {
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    handleAddCategory,
    handleDeleteCategory,
  } = useTodolist(token);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const taskId = parseInt(draggableId);
    const newCategoryId = parseInt(destination.droppableId);

    handleEditTask(taskId, { category: newCategoryId });
  };

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
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
                    handleDeleteTask={handleDeleteTask}
                    options={options}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
          {/* <CategoryListItem key="checked" /> */}
        </div>
      </DragDropContext>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        modalType={modalType}
        categories={categoryOptions}
      />

      {/* <form onSubmit={handleSubmit(handleAddCategory)}>
        <input
          {...register('title', { required: 'title is required' })}
          type="text"
          placeholder="title"
        />
        {errors.name && (
          <div style={{ color: 'red' }}>{errors.name.message}</div>
        )}
        <button type="submit">submit</button>
      </form> */}
    </div>
  );
};
