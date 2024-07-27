import React from 'react';
import { Controller } from 'react-hook-form';
import styles from './checkbox.module.css';

export const Checkbox = ({ control, name, label, ...rest }) => {
  return (
    <div className={styles.customCheckboxContainer}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input
              type="checkbox"
              id={name}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className={styles.checkbox}
              {...rest}
            />
            <label
              htmlFor={name}
              className={styles.label}
            >
              <span className={styles.checkmark}></span>
              {label}
            </label>
          </>
        )}
      />
    </div>
  );
};
