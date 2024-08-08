import React from 'react';
import { useState } from 'react';
import styles from './resetPassForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Input, ErrorMessage } from '@ui/index';
import { MdOutlineMail } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { resetPassword } from '../../store/api/authApi';


function ResetPassForm() {

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

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const onSubmit = async () => {
    try {
      const response = await resetPassword({ email });
      if(response.data.status === 'OK'){
        setShowConfirmation(true);
        setError('')
      }
    } catch (error) {
      setError(error.response.data.errors.email[0])
    }
  };

  return (
    <form
      className={styles.resetPassForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className={styles.headerName}>Reset Password</h1>
      <h2 className={styles.headerText}>
        Enter your email address to get reset link on it
      </h2>
      <Input
        name="email"
        type="text"
        control={control}
        placeholder="Email"
        icon={MdOutlineMail}
        showPasswordToggle
        onValueChange={handleEmailChange}
      />
      {showConfirmation && (
        <h3 className={styles.emailSuccess}>Email has been sent</h3>
      )}
      {error && (
        <h3 className={styles.emailError}>{error}</h3>
      )}
      <Button
        label="Send email"
        type="submit"
        variant="mainButton"
      />
      <NavLink to='/login'>
        <h2 className={styles.returnButton}>&lt;-return</h2>
      </NavLink>
    </form>
  );
}

export default ResetPassForm;