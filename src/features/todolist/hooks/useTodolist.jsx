import { useDispatch } from 'react-redux';
import {
  addTask,
  removeTask,
  editTask,
} from '@features/todolist/slices/taskSlice';
import {
  addCategory,
  removeCategory,
} from '@features/todolist/slices/categorySlice';

export const useTodolist = (token) => {
  const dispatch = useDispatch();

  const handleAddTask = (data) => {
    const taskData = {
      name: data.name,
      category: data.category,
      priority: data.priority,
    };
    dispatch(addTask({ token, taskData }));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(removeTask({ token, taskId }));
  };

  const handleEditTask = (taskId, taskData) => {
    dispatch(editTask({ token, taskId, taskData }));
  };

  const handleAddCategory = (data) => {
    const categoryData = {
      name: data.name,
    };
    dispatch(addCategory({ token, categoryData }));
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(removeCategory({ token, categoryId }));
  };

  const handleDuplicateTask = (task) => {
    const taskData = {
      name: task.name,
      category: task.category,
      priority: task.priority,
    };
    dispatch(addTask({ token, taskData }));
  };

  return {
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    handleAddCategory,
    handleDeleteCategory,
    handleDuplicateTask,
  };
};
