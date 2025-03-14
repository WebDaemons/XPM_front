import axiosInstance from '@store/api/axiosInstance';

export const getNotes = async (token) => {
  try {
    const response = await axiosInstance.get('/notes/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const createNote = async (token, data) => {
  try {
    const response = await axiosInstance.post('/notes/create/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};
export const deleteNote = async (token, id) => {
  try {
    const response = await axiosInstance.delete(`/notes/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};
export const updateNote = async (token, data, id) => {
  try {
    const response = await axiosInstance.put(`/notes/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};
