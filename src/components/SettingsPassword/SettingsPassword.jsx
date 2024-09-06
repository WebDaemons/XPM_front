import React from 'react';
import styles from './settingsPassword.module.css';

export const SettingsPassword = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.passwordWrapper}>
        <div className={styles.description}>
          <h2>Current Password</h2>
        </div>
        <div className={styles.passwordInputWrapper}>
          <input type="password" />
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.passwordWrapper}>
        <div className={styles.description}>
          <h2>New Password</h2>
        </div>
        <div className={styles.passwordInputWrapper}>
          <input type="password" />
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.passwordWrapper}>
        <div className={styles.description}>
          <h2>Confirm Password</h2>
        </div>
        <div className={styles.passwordInputWrapper}>
          <input type="password" />
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.buttons}>
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
};
