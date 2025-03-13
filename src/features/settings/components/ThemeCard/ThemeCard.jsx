import React from 'react';
import styles from './themeCard.module.css';
import { useTheme } from '@context/ThemeContext.jsx';

export const ThemeCard = ({ themeName, img, isActive, onClick }) => {
  const { theme, setNewTheme } = useTheme();

  return (
    <div
      className={styles.wrapper}
      onClick={() => setNewTheme(onClick)}
    >
      <header>
        <p>{themeName}</p>
        <div></div>
      </header>
      <div className={styles.img}>
        <img src={img} />
      </div>
    </div>
  );
};
