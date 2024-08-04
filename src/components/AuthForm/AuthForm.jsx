import React from 'react';
import styles from './authForm.module.css';
import { useForm } from 'react-hook-form';
import { Button, Input, ErrorMessage } from '@ui/index';
import { NavLink } from 'react-router-dom';
import {
  MdOutlineMail,
  FiLock,
  FiUnlock,
  BiUser,
  RiProfileLine,
} from '@ui/icons';

function AuthForm() {
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      className={styles.authForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Button
        label="Sign up with Google"
        variant="signByButton"
      />
      <div className={styles.orDelimiter}>
        <span>OR</span>
      </div>
      <div className={styles.fullName}>
        <Input
          name="name"
          type="text"
          control={control}
          placeholder="Name"
          icon={BiUser}
          showPasswordToggle
        />
        <Input
          name="surname"
          type="text"
          control={control}
          placeholder="Surname"
          icon={RiProfileLine}
          showPasswordToggle
        />
      </div>
      <Input
        name="email"
        type="text"
        control={control}
        placeholder="Email"
        icon={MdOutlineMail}
        showPasswordToggle
      />
      {/* <ErrorMessage label="Field can`t be empty." /> */}
      <Input
        name="password"
        type="password"
        control={control}
        placeholder="Password"
        icon={FiLock}
        showPasswordToggle
      />
      <Input
        name="passwordConfirm"
        type="password"
        control={control}
        placeholder="Confirm Password"
        icon={FiUnlock}
        showPasswordToggle
      />
      <Button
        label="Sign Up Now"
        type="submit"
        variant="mainButton"
      />
      <div className={styles.formFooter}>
        <p>
          Already have an account?
          <NavLink
            to="/login"
            key="Login"
          >
            <span style={{ color: '#1B76FF' }}>Sign In</span>
          </NavLink>
        </p>
      </div>
    </form>
  );
}

export default AuthForm;
