import axiosInstance from './axiosInstance';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/core/user/login/', credentials);
  return response;
};

export const register = async (data) => {
  const response = await axiosInstance.post('/core/user/registration/', data);
  return response;
};

export const resetPassword = async (data) => {
  const response = await axiosInstance.post('/core/user/password_reset/', data);
  return response;
};

export const resetPasswordConfirm = async (data) => {
  const response = await axiosInstance.post('/core/user/password_reset/confirm/', data);
  return response;
};