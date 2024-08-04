import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './authForm.module.css';
import { useForm } from 'react-hook-form';
import { Button, Input, ErrorMessage } from '@ui/index';
import { MdOutlineMail } from 'react-icons/md';
import { FiLock, FiUnlock } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { RiProfileLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { registerUser } from '../../store/slices/authSlice';

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

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [passwordMatch, setPasswordMatch] = useState(false);

  const authError = useSelector((state) => state.auth.error);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleSurnameChange = (value) => {
    setSurname(value);
  };

  const handlePasswordConfirmChange = (value) => {
    setPasswordConfirm(value);
  };

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const onSubmit = () => {
    if(password !== passwordConfirm) {
      setPasswordMatch(true);
      return;
    }
    const data = {
      user: {
        email,
        name,
        surname,
        password,
      },
    };
    dispatch(registerUser(data));
  };

  return (
    <form
      className={styles.authForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className={styles.headerName}>Create an account</h1>
      <h2 className={styles.headerText}>Let`s get started</h2>
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
          onValueChange={handleNameChange}
        />
        <Input
          name="surname"
          type="text"
          control={control}
          placeholder="Surname"
          icon={RiProfileLine}
          showPasswordToggle
          onValueChange={handleSurnameChange}
        />
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
      <Input
        name="passwordConfirm"
        type="password"
        control={control}
        placeholder="Confirm Password"
        icon={FiUnlock}
        showPasswordToggle
        onValueChange={handlePasswordConfirmChange}
      />
      <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          I agree to 
          <span style={{color:"#1B76FF"}}>
            &thinsp;
            Term
          </span>
          &thinsp;
          &
          <span style={{color:"#1B76FF"}}>
            &thinsp;
            Privacy Policy
          </span>  
        </label>
      <Button
        label="Sign Up Now"
        type="submit"
        variant="mainButton"
      />
      <h3 className={styles.registerError}>{authError}</h3>
      {passwordMatch && (
        <h3 className={styles.registerError}>Password don't match</h3>
      )}
      <div className={styles.formFooter}>
        <p>Already have an account? 
          <NavLink to='/login' key='Login'>
            <span style={{color:"#1B76FF"}}>
              Sign In
            </span>
          </NavLink>
        </p>
      </div>
    </form>
  );
}

export default AuthForm;
