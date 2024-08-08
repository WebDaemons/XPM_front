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

export const updateUser = async (data, token) => {
  const response = await axiosInstance.post(
    '//localhost:5000/skills/post',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
