import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import styles from './input.module.css';
import { PiEye, PiEyeClosed } from 'react-icons/pi';

export const Input = ({
  type = 'text',
  name,
  control,
  placeholder,
  icon: Icon,
  showPasswordToggle,
  defaultValue = '',
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={styles.inputWrapper}>
      {Icon && (
        <Icon
          className={styles.inputIcon}
          style={{
            color: isFocused ? 'var(--primary-blue)' : '#cbcbcb',
            transition: '0.4s ease',
          }}
        />
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: true }}
        render={({ field }) => (
          <input
            {...field}
            {...rest}
            type={inputType}
            placeholder={placeholder}
            value={inputValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              field.onChange(e);
              setInputValue(e.target.value);
            }}
            className={styles.inputController}
            style={{
              paddingLeft: Icon ? '3rem' : '0.5rem',
              paddingRight: showPasswordToggle ? '2.5rem' : '0.5rem',
              color: inputType === 'password' ? '#cbcbcb' : '#647080',
              border: isFocused
                ? '2px solid var(--primary-blue)'
                : '2px solid #ebebeb',
              transition: '0.4s ease',
            }}
          />
        )}
      />
      {type === 'password' && showPasswordToggle && inputValue && (
        <div
          onClick={handleTogglePassword}
          className={styles.togglePasswordIcon}
        >
          {showPassword ? (
            <PiEyeClosed
              size={24}
              color="#CBCBCB"
            />
          ) : (
            <PiEye
              size={24}
              color="#CBCBCB"
            />
          )}
        </div>
      )}
    </div>
  );
};
