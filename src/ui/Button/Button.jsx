import React from 'react';
import styles from './button.module.css';

export const Button = ({
  children,
  type = 'button',
  disabled = false,
  variant = 'contained',
  size = 'md',
  startIcon,
  endIcon,
  onClick,
}) => {
  const StartIcon = startIcon;
  const EndIcon = endIcon;

  // size: sm || md || lg
  // variant: text || contained || outline

  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[variant]}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {startIcon && <StartIcon />}
      {children}
      {endIcon && <EndIcon />}
    </button>
  );
};
