import React from 'react';

export const ErrorMessage = ({ label }) => {
  return (
    <span
      style={{
        marginTop: '-5px',
        paddingLeft: '7px',
        color: 'red',
      }}
    >
      {label}
    </span>
  );
};
