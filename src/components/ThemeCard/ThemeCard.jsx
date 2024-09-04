import React from 'react';
import styles from './themeCard.module.css';

export const ThemeCard = ({ theme, img, isActive }) => {
  return (
    <div className={styles.wrapper}>
      <header>
        <p>{theme}</p>
        <div></div>
      </header>
      <div className={styles.img}>
        <img src={img} />
      </div>
    </div>
  );
};
