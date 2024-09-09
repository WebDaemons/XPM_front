import React from 'react';
import styles from './toolbar.module.css';

export const Toolbar = ({ children }) => {
  return <div className={styles.toolbarWrapper}>{children}</div>;
};
