import React from 'react';
import styles from './button.module.css';

const Button = ({ label, type, icon, variant }) => {
  const className =
    variant === 'signByButton' ? styles.signByButton : styles.mainButton;

  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
    >
      {icon && (
        <img
          src={icon}
          className={styles.buttonIcon}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
