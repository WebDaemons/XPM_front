import React, { useState, useEffect } from 'react';
import styles from './checkbox.module.css';
import { FaCheck } from '@ui/icons';

export const Checkbox = ({ children, size = 'md', onChange, isChecked }) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleCheckBoxChange = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  // size: sm || md || lg
  const iconSize = size === 'sm' ? 8 : size === 'md' ? 10 : 14;

  return (
    <label className={styles.checkboxLabel}>
      <div
        className={`${styles.checkbox} ${checked ? styles.checked : ''} ${styles[size]}`}
        onClick={handleCheckBoxChange}
      >
        {checked ? (
          <FaCheck
            className={styles.icon}
            size={iconSize}
          />
        ) : (
          ''
        )}
      </div>
      {children && <span className={styles.labelText}>{children}</span>}
    </label>
  );
};
