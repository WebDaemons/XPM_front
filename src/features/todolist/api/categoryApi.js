import axiosInstance from '../../../store/api/axiosInstance';

export const getCategories = async (token) => {
  try {
    const response = await axiosInstance.get('/tasks/category', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createCategory = async (token, data) => {
  try {
    const response = await axiosInstance.post('/tasks/category/create/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const deleteCategory = async (token, categoryId) => {
  try {
    const response = await axiosInstance.delete(
      `/tasks/category/delete/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const updateCategory = async (token, data, categoryId) => {
  try {
    const response = await axiosInstance.put(
      `/tasks/category/update/${categoryId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};
