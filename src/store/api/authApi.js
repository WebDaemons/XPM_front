import axiosInstance from './axiosInstance';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/core/user/login/', credentials);
  return response;
};

export const register = async (data) => {
  const response = await axiosInstance.post('/core/user/registration/', data);
  return response;
};