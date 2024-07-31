import React from 'react';
import { useState } from 'react';
import styles from './signInForm.module.css';
import { useForm } from 'react-hook-form';
import { Button, Input, ErrorMessage } from '@ui/index';
import { MdOutlineMail } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';


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

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      className={styles.signInForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.formHeader}>
        <h1 className={styles.headerName}>Sign In</h1>
        <h2 className={styles.headerText}>Enter your email address and password to get access to account</h2>
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
      <div className={styles.signInOptions}>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          Remember me
        </label>
        <NavLink to='/login/resetpassword'><span style={{color:"#1B76FF"}}>Forgot password?</span></NavLink>
      </div>
      <Button
        label="Sign In"
        type="submit"
        variant="mainButton"
      />
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
