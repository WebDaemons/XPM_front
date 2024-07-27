import React from 'react';
import AuthForm from '@components/AuthForm/AuthForm';

function Auth() {
  return (
    <div
      style={{
        height: '100svh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AuthForm />
    </div>
  );
}

export default Auth;
