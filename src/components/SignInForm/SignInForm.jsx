import React from 'react';
import { useState } from 'react';
import styles from './signInForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Input, ErrorMessage } from '@ui/index';
import { MdOutlineMail } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


function SignInForm() {

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

  const { login } = useAuth();

  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector((state) => state.auth.error);

  const handleEmailChange = (value) => {
    console.log('Input value:', value);
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    console.log('Input value:', value);
    setPassword(value);
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const onSubmit = () => {
    const credentials = {
      user: {
        email,
        password,
      },
    };
    login(credentials);
  };

  return (
    <form
      className={styles.signInForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.formHeader}>
        <h1 className={styles.headerName}>Sign In</h1>
        <h2 className={styles.headerText}>
          Enter your email address and password to get access to account
        </h2>
      </div>
      <Input
        name="email"
        type="text"
        control={control}
        placeholder="Email"
        icon={MdOutlineMail}
        showPasswordToggle
        onValueChange={handleEmailChange}
      />
      {/* <ErrorMessage label="Field can`t be empty." /> */}
      <Input
        name="password"
        type="password"
        control={control}
        placeholder="Password"
        icon={FiLock}
        showPasswordToggle
        onValueChange={handlePasswordChange}
      />
      <div className={styles.signInOptions}>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          Remember me
        </label>
        <NavLink to='/login/resetpassword'>
          <span style={{color:"#1B76FF"}}>
            Forgot password?
          </span>
        </NavLink>
      </div>
      <Button
        label="Sign In"
        type="submit"
        variant="mainButton"
      />
      <h3 className={styles.loginError}>{error}</h3>
      <div className={styles.orDelimiter}>
        <span>OR</span>
      </div>
      <Button
        label="Sign in with Google"
        variant="signByButton"
      />
      <div className={styles.formFooter}>
        <p>Don`t have an account? 
          <NavLink to='/signup' key='Registration'>
            <span style={{color:"#1B76FF"}}>
              Sign Up
            </span>
          </NavLink>
        </p>
      </div>
    </form>
  );
}

export default SignInForm;
