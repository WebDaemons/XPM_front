import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './settingsPassword.module.css';
import { Button } from '@ui/index';
import { updateUserAction } from '@store/slices/userSlice';

export const SettingsPassword = () => {
  const dispatch = useDispatch();

  const [passError, setPassError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const error = useSelector((state) => state.user.error);

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPassError('');
  };

  const handlePasswordConfirmChange = (value) => {
    setPasswordConfirm(value);
    setPassError('');
  };

  const onSubmit = async () => {
    if (password !== passwordConfirm) {
      setPassError('Password didn`t match');
      return;
    }
    const data = {
      user: {
        password,
      },
    };
    const resultAction = await dispatch(updateUserAction({ data }));
    if (resultAction.type === 'user/updateUser/fulfilled') {
      setSuccessMessage('Password changed!');
    }
  };

  const renderError = () => {
    if (!error) return null;

    const errorMessage =
      error?.response?.data.errors?.password?.[0] || 'An error occurred';
    return (
      <div className={styles.error}>
        {typeof errorMessage === 'string' ? errorMessage : 'An error occurred'}
      </div>
    );
  };

  return (
    <form
      className={styles.wrapper}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {/* <div className={styles.passwordWrapper}>
        <div className={styles.description}>
          <h2>Current Password</h2>
        </div>
        <div className={styles.passwordInputWrapper}>
          <input type="password" />
        </div>
      </div>
      <div className={styles.divider}></div> */}
      <div className={styles.passwordWrapper}>
        <div className={styles.description}>
          <h2>New Password</h2>
        </div>
        <div className={styles.passwordInputWrapper}>
          <input
            type="password"
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.passwordWrapper}>
        <div className={styles.description}>
          <h2>Confirm Password</h2>
        </div>
        <div className={styles.passwordInputWrapper}>
          <input
            type="password"
            onChange={(e) => handlePasswordConfirmChange(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.divider}></div>
      {passError && <h3 className={styles.error}>{passError}</h3>}
      {successMessage && <h3 className={styles.success}>{successMessage}</h3>}
      {renderError()}
      <div className={styles.buttons}>
        <Button type="submit">Save</Button>
        <div style={{ marginRight: '20px' }}></div>
        {/* <Button>Cancel</Button> */}
      </div>
    </form>
  );
};
