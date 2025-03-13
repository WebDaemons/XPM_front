import axiosInstance from '../../../store/api/axiosInstance';

export const getTasks = async (token) => {
  try {
    const response = await axiosInstance.get('/tasks/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTask = async (token, taskId) => {
  try {
    const response = await axiosInstance.get(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
};

export const createTask = async (token, data) => {
  try {
    const response = await axiosInstance.post('/tasks/create/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};
export const deleteTask = async (token, taskId) => {
  try {
    const response = await axiosInstance.delete(`/tasks/delete/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
export const updateTask = async (token, data, taskId) => {
  try {
    const response = await axiosInstance.put(`/tasks/update/${taskId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};
