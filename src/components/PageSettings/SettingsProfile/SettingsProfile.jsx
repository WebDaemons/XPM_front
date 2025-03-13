import React from 'react';
import styles from './settingsProfile.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ui/index';
import { updateUserAction, getUserAction } from '@store/slices/userSlice';

export const SettingsProfile = () => {
  const dispatch = useDispatch();

  const oldEmail = useSelector((state) => state.user.email);
  const oldName = useSelector((state) => state.user.name);
  const oldSurname = useSelector((state) => state.user.surname);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleSurnameChange = (value) => {
    setSurname(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const onSubmit = async () => {
    const data = {
      user: {
        ...(name && { name }),
        ...(surname && { surname }),
        ...(email && { email }),
      },
    };
    dispatch(updateUserAction({ data }));
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUserAction());
    }
  }, [dispatch, status]);

  return (
    <form
      className={styles.wrapper}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={styles.inputWrapper}>
        <h2>Full Name</h2>
        <input
          type="text"
          placeholder={oldName}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <input
          type="text"
          placeholder={oldSurname}
          onChange={(e) => handleSurnameChange(e.target.value)}
        />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.inputWrapper}>
        <h2>Email</h2>
        <input
          type="email"
          placeholder={oldEmail}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.buttons}>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};
