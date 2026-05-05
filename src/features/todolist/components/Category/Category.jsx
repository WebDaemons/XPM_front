import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@features/todolist/slices/categorySlice';
import { fetchTasks } from '@features/todolist/slices/taskSlice';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTodolist } from '@features/todolist/hooks/useTodolist';
import styles from './category.module.css';
import { CategoryListItem } from '@features/todolist/components/CategoryListItem/CategoryListItem';
import { CategoryBoardItem } from '@features/todolist/components/CategoryBoardItem/CategoryBoardItem';
import { CompletedBoardItem } from '@features/todolist/components/CompletedBoardItem/CompletedBoardItem';
import { TodoTrashItem } from '@features/todolist/components/TodoTrashItem/TodoTrashItem';
import { AddEditTodo } from '@features/todolist/components/AddEditTodo/AddEditTodo';
import { AddCategory } from '@features/todolist/components/AddCategory/AddCategory';
import { TaskBoardItem } from '@features/todolist/components/TaskBoardItem/TaskBoardItem';
import { Button } from '@ui/index';
import { FiPlus } from '@ui/icons';
import { LuSquareKanban, LuListChecks } from 'react-icons/lu';
import {
  DndContext,
  closestCenter,
  closestCorners,
  pointerWithin,
  DragOverlay,
} from '@dnd-kit/core';

export const Category = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const token = localStorage.getItem('token');
  const [viewType, setViewType] = useState('board');
  const [activeTask, setActiveTask] = useState(null);

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

  // const onDragEnd = (result) => {
  //   const { destination, source, draggableId } = result;

  //   if (!destination) return;

  //   const taskId = parseInt(draggableId);
  //   const newCategoryId = parseInt(destination.droppableId);

  //   handleEditTask(taskId, { category: newCategoryId });
  // };

  const onDragStart = (event) => {
    const taskId = event.active.id;
    const task = tasks.find((t) => t.id === taskId);
    console.log('taskid:  ' + taskId + 'categoryid:  ' + task.category);
    setActiveTask(task);
  };

  const onDragEnd = ({ over }) => {
    if (!over || !activeTask) return;

    if (over.data?.current?.type !== 'category') return;

    handleEditTask(activeTask.id, {
      category: Number(over.id),
    });

    setActiveTask(null);
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
    {
      value: 'N',
      label: 'Select priority',
      color: 'black',
      rgba: 'rgba(137, 137, 137, 0.1)',
    },
    {
      value: 'H',
      label: 'High',
      color: 'red',
      rgba: 'rgba(254, 137, 137, 0.25)',
    },
    {
      value: 'M',
      label: 'Medium',
      color: 'orange',
      rgba: 'rgba(233, 220, 120, 0.25)',
    },
    {
      value: 'L',
      label: 'Low',
      color: 'green',
      rgba: 'rgba(80, 204, 109, 0.25)',
    },
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

  const boardRef = useRef(null);

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;

    const onMouseDown = (e) => {
      if (e.target.closest('[data-task]')) {
        return;
      }
      isDown = true;
      isDragging = false;

      startX = e.pageX;
      scrollLeft = el.scrollLeft;
    };

    const onMouseMove = (e) => {
      if (!isDown) return;

      const walk = e.pageX - startX;

      // 👇 если сдвинулись больше чем на 5px — это drag, а не клик
      if (Math.abs(walk) > 5) {
        isDragging = true;
      }

      if (isDragging) {
        e.preventDefault();
        el.scrollLeft = scrollLeft - walk;
      }
    };

    const onMouseUp = () => {
      isDown = false;

      setTimeout(() => {
        isDragging = false;
      }, 0);
    };

    const onClickCapture = (e) => {
      // 👇 если был drag — блокируем клик
      if (isDragging) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mouseleave', onMouseUp);
    el.addEventListener('click', onClickCapture, true);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mouseleave', onMouseUp);
      el.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // gap: '10px',
        height: '100svh',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
          // borderBottom: '5px solid red',
        }}
        className={styles.header}
      >
        {/* <div style={{ display: 'flex', gap: '5px', flexDirection: 'row' }}>
          <Button
            variant="outlined"
            size="lg"
            startIcon={LuSquareKanban}
            onClick={() => setViewType('kanban')}
          >
            Board
          </Button>
          <Button
            variant="outlined"
            size="lg"
            startIcon={LuListChecks}
            onClick={() => setViewType('list')}
          >
            List
          </Button>
        </div> */}
        <div className={styles.viewSwitch}>
          <button
            className={`${styles.viewSwitchBtn} ${
              viewType === 'board' ? styles.viewSwitchBtnActive : ''
            }`}
            onClick={() => setViewType('board')}
          >
            <span className={styles.viewIcon}>
              <LuSquareKanban />
            </span>
            Board
          </button>
          <button
            className={`${styles.viewSwitchBtn} ${
              viewType === 'list' ? styles.viewSwitchBtnActive : ''
            }`}
            onClick={() => setViewType('list')}
          >
            <span className={styles.viewIcon}>
              <LuListChecks />
            </span>
            List
          </button>
        </div>
        {/* <div style={{ display: 'flex', gap: '10px', flexDirection: 'row' }}>
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
        </div> */}
      </div>
      {viewType == 'list' ? (
        // <DragDropContext onDragEnd={onDragEnd}>
        //   <div className={styles.categoryList}>
        //     {categories.map((category, index) => (
        //       <Droppable
        //         droppableId={String(category.id)}
        //         key={category.id}
        //       >
        //         {(provided) => (
        //           <div
        //             ref={provided.innerRef}
        //             {...provided.droppableProps}
        //           >
        //             <CategoryListItem
        //               key={category.id}
        //               category={category}
        //               tasks={unDoneTasks}
        //               index={index}
        //               rotatedState={rotatedStates[index]}
        //               handleArrowClick={handleArrowClick}
        //               getTaskCount={getTaskCount}
        //               handleDeleteCategory={handleDeleteCategory}
        //               handleDeleteTask={handleDeleteTask}
        //               options={options}
        //               handleToggleTaskStatus={handleToggleTaskStatus}
        //               categoryOptions={categoryOptions}
        //             />
        //             {provided.placeholder}
        //           </div>
        //         )}
        //       </Droppable>
        //     ))}
        //     <TodoTrashItem
        //       tasks={doneTasks}
        //       handleToggleTaskStatus={handleToggleTaskStatus}
        //       options={options}
        //     />
        //   </div>
        // </DragDropContext>
        ''
      ) : (
        <DndContext
          collisionDetection={pointerWithin}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <div
            ref={boardRef}
            className={styles.categoryBoard}
          >
            {categories.map((category, index) => (
              <CategoryBoardItem
                key={category.id}
                category={category}
                tasks={unDoneTasks}
                index={index}
                getTaskCount={getTaskCount}
                handleDeleteCategory={handleDeleteCategory}
                handleDeleteTask={handleDeleteTask}
                options={options}
                handleToggleTaskStatus={handleToggleTaskStatus}
                categoryOptions={categoryOptions}
              />
            ))}
            <CompletedBoardItem
              tasks={doneTasks}
              handleToggleTaskStatus={handleToggleTaskStatus}
              options={options}
            />
          </div>
          <DragOverlay>
            {activeTask ? (
              <TaskBoardItem
                task={activeTask}
                isOverlay
                options={options}
                handleToggleTaskStatus={handleToggleTaskStatus}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

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
