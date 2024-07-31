import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useState, useEffect  } from 'react';
import AuthForm from '@components/AuthForm/AuthForm';
import SignInForm from '../../components/SignInForm/SignInForm';

function Auth() {

  const location = useLocation();
  const [pageSelector, setPageSelector] = useState(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/login') {
      setPageSelector('login');
    } else if (path === '/signup') {
      setPageSelector('signup');
    }
    console.log(path)
  }, [location.pathname]);

  const renderForm = () => {
    switch (pageSelector) {
      case 'signup':
        return <AuthForm />;
      case 'login':
        return <SignInForm />;
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
