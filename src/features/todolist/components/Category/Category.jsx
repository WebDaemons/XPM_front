import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@features/todolist/slices/categorySlice';
import { fetchTasks } from '@features/todolist/slices/taskSlice';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTodolist } from '@features/todolist/hooks/useTodolist';
import styles from './category.module.css';
import { CategoryListItem } from '@features/todolist/components/CategoryListItem/CategoryListItem';
import { TodoTrashItem } from '@features/todolist/components/TodoTrashItem/TodoTrashItem';
import { AddEditTodo } from '@features/todolist/components/AddEditTodo/AddEditTodo';
import { AddCategory } from '@features/todolist/components/AddCategory/AddCategory';
import { Button } from '@ui/index';
import { FiPlus } from '@ui/icons';

export const Category = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [token] = useState(localStorage.getItem('token'));

  const handleOpenTaskModal = (type) => {
    setModalType(type);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => setIsTaskModalOpen(false);

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

  const unDoneTasks = tasks.filter((task) => !task.is_done);
  const doneTasks = tasks.filter((task) => task.is_done);

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
    return tasks.filter((item) => item.category === categoryId && !item.is_done)
      .length;
  };

  const options = [
    { value: 'N', label: 'Select priority', color: 'black' },
    { value: 'H', label: 'High', color: 'red' },
    { value: 'M', label: 'Medium', color: 'orange' },
    { value: 'L', label: 'Low', color: 'green' },
  ];
  const categoryOptions = categories.map((category) => ({
    id: category.id,
    label: category.name,
  }));

  const handleModalOpen = () => {
    setIsTaskModalOpen(true);
  };

  const handleModalClose = () => {
    setIsTaskModalOpen(false);
  };

  const handleCategoryOpen = () => {
    setIsCategoryModalOpen((prev) => !prev);
  };

  const handleToggleTaskStatus = (taskId) => {
    const taskData = tasks.find((task) => task.id === taskId);

    if (taskData) {
      const updatedTaskData = {
        ...taskData,
        is_done: !taskData.is_done,
      };
      handleEditTask(taskId, updatedTaskData);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div></div>
        {/* <Button
          variant="outlined"
          startIcon={BsSortUp}
        >
          Filter
        </Button> */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="outlined"
            startIcon={FiPlus}
            onClick={() => handleCategoryOpen()}
          >
            Add Category
          </Button>
          <Button
            startIcon={FiPlus}
            onClick={() => handleModalOpen()}
          >
            Add Task
          </Button>
        </div>
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
                    tasks={unDoneTasks}
                    index={index}
                    rotatedState={rotatedStates[index]}
                    handleArrowClick={handleArrowClick}
                    getTaskCount={getTaskCount}
                    handleDeleteCategory={handleDeleteCategory}
                    handleDeleteTask={handleDeleteTask}
                    options={options}
                    handleToggleTaskStatus={handleToggleTaskStatus}
                    categoryOptions={categoryOptions}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <TodoTrashItem
        tasks={doneTasks}
        handleToggleTaskStatus={handleToggleTaskStatus}
        options={options}
      />
      <AddEditTodo
        isOpen={isTaskModalOpen}
        onClose={handleModalClose}
        type="add"
        categoryOptions={categoryOptions}
      />
      <AddCategory
        isOpen={isCategoryModalOpen}
        onClose={handleCategoryOpen}
      />
    </div>
  );
};
