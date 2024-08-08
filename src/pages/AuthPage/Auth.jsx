import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useState, useEffect  } from 'react';
import AuthForm from '@components/AuthForm/AuthForm';
import SignInForm from '../../components/SignInForm/SignInForm';
import ResetPassForm from '../../components/ResetPassFrom/ResetPassForm';
import ResetPassConfirmForm from '../../components/ResetPassConfirmForm/ResetPassConfirmForm';

function Auth() {

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
    console.log(path)
  }, [location.pathname]);

  const renderForm = () => {
    switch (pageSelector) {
      case 'signup':
        return <AuthForm />;
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
}

export default Auth;
