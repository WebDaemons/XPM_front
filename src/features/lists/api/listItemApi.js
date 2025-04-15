import axiosInstance from '@store/api/axiosInstance';

export const createListItem = async (token, data, listId) => {
  try {
    const response = await axiosInstance.post(
      `/lists/${listId}/add-item/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating list item:', error);
    throw error;
  }
};
export const deleteListItem = async (token, listItemId) => {
  try {
    const response = await axiosInstance.delete(
      `/lists/item/${listItemId}/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting list item:', error);
    throw error;
  }
};
export const updateListItem = async (token, data, listItemId) => {
  try {
    const response = await axiosInstance.patch(
      `/lists/item/${listItemId}/update`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating list item:', error);
    throw error;
  }
};
