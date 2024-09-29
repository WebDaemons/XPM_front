import axiosInstance from './axiosInstance';

export const getUser = async (token) => {
  const response = await axiosInstance.get('/core/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response;
};

export const updateUser = async (token, data) => {
  const response = await axiosInstance.put(
    '/core/user',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
