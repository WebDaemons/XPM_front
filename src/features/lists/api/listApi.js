import axiosInstance from '@store/api/axiosInstance';

export const getLists = async (token) => {
  try {
    const response = await axiosInstance.get('/lists/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching lists:', error);
    throw error;
  }
};

export const createList = async (token, data) => {
  try {
    const response = await axiosInstance.post('/lists/create/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating list:', error);
    throw error;
  }
};
export const deleteList = async (token, id) => {
  try {
    const response = await axiosInstance.delete(`/lists/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting list:', error);
    throw error;
  }
};
export const updateList = async (token, data, id) => {
  try {
    const response = await axiosInstance.patch(`/lists/${id}/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating list:', error);
    throw error;
  }
};
