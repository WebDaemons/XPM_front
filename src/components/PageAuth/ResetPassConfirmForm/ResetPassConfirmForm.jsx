import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, ErrorMessage } from '@ui/index';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPasswordConfirm } from '@api/authApi';
import { FiLock, FiUnlock } from 'react-icons/fi';
import styles from './resetPassConfirmForm.module.css';

export const ResetPassConfirmForm = () => {
  const {
    handleSubmit,
    control,
    formState,
    // formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      terms: false,
    },
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handlePasswordConfirmChange = (value) => {
    setPasswordConfirm(value);
  };

  const onSubmit = async () => {
    if (password !== passwordConfirm) {
      setError('Password didn`t match');
      return;
    }
    try {
      const response = await resetPasswordConfirm({ token, password });
      if (response.data.status === 'OK') {
        navigate('/login');
      }
    } catch (error) {
      setError(error.response.data.errors.password[0]);
    }
  };

  return (
    <form
      className={styles.resetPassConfirmForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className={styles.headerName}>Reset Password</h1>
      <h2 className={styles.headerText}>
        Enter new password and press the button to set it
      </h2>
      <Input
        name="password"
        type="password"
        control={control}
        placeholder="Password"
        icon={FiLock}
        showPasswordToggle
        onValueChange={handlePasswordChange}
      />
      <Input
        name="passwordConfirm"
        type="password"
        control={control}
        placeholder="Confirm Password"
        icon={FiUnlock}
        showPasswordToggle
        onValueChange={handlePasswordConfirmChange}
      />
      {error && <h3 className={styles.passError}>{error}</h3>}
      <Button
        type="submit"
        variant="contained"
        size="lg"
      >
        Reset password
      </Button>
    </form>
  );
};
