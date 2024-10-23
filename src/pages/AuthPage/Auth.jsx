import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SignInForm,
  SignUpForm,
  ResetPassForm,
  ResetPassConfirmForm,
} from '@components/index';

export const Auth = () => {
  const location = useLocation();
  const [pageSelector, setPageSelector] = useState(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/login') {
      setPageSelector('login');
    } else if (path === '/signup') {
      setPageSelector('signup');
    } else if (path === '/login/resetpassword') {
      setPageSelector('resetpassword');
    } else if (path === '/login/resetpassword/confirm') {
      setPageSelector('confirm');
    }
    console.log(path);
  }, [location.pathname]);

  const renderForm = () => {
    switch (pageSelector) {
      case 'signup':
        return <SignUpForm />;
      case 'login':
        return <SignInForm />;
      case 'resetpassword':
        return <ResetPassForm />;
      case 'confirm':
        return <ResetPassConfirmForm />;
      default:
        return <SignInForm />;
    }
  };

  return (
    <div
      style={{
        height: '100svh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {renderForm()}
    </div>
  );
};
