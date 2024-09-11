import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask, removeTask, editTask } from '@slices/taskSlice';
import {
  addCategory,
  removeCategory,
  editCategory,
} from '@slices/categorySlice';

export const useTodolist = (token) => {
  const dispatch = useDispatch();

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
    dispatch(editTask({ token, taskId, taskData }));
  };

  const handleAddCategory = (data) => {
    const categoryData = {
      name: data.title,
    };
    dispatch(addCategory({ token, categoryData }));
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(removeCategory({ token, categoryId }));
  };

  return {
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    handleAddCategory,
    handleDeleteCategory,
  };
};
