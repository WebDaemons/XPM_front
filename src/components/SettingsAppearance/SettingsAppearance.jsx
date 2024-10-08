import React, { useEffect } from 'react';
import styles from './settingsAppearance.module.css';
import { ThemeCard } from '@components/index';
import lightImg from '@assets/lightTheme.png';
import darkImg from '@assets/darkTheme.png';
import systemImg from '@assets/systemTheme.png';
import { FiSun, FiMoon, FiMonitor } from '@ui/icons';

export const SettingsAppearance = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.themeWrapper}>
        <div className={styles.description}>
          <h2>Interface theme</h2>
          <p>Choose your app theme</p>
        </div>
        <div className={styles.themeCards}>
          <ThemeCard
            themeName="Light"
            img={lightImg}
            onClick="light"
            icon={FiSun}
          />
          <ThemeCard
            themeName="Dark"
            onClick="dark"
            img={darkImg}
            isActive={FiMoon}
          />
          <ThemeCard
            themeName="System"
            img={systemImg}
            isActive={FiMonitor}
          />
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.accentWrapper}>
        <div className={styles.description}>
          <h2>System accent color</h2>
          <p>Choose your app accent color</p>
        </div>
        <div className={styles.accentColorsWrapper}>
          <div className={styles.accentColors}>
            <div
              className={styles.color}
              style={{ backgroundColor: 'red' }}
            ></div>
            <div
              className={styles.color}
              style={{ backgroundColor: 'blue' }}
            ></div>
            <div
              className={styles.color}
              style={{ backgroundColor: 'yellow' }}
            ></div>
            <div
              className={styles.color}
              style={{ backgroundColor: 'purple' }}
            ></div>
            <div
              className={styles.color}
              style={{ backgroundColor: 'green' }}
            ></div>
            <div
              className={styles.color}
              style={{ backgroundColor: 'aqua' }}
            ></div>
          </div>
          <div className={styles.customColorWrapper}>
            <p>Custom color</p>
            <input
              type="text"
              placeholder="#"
            />
            <div className={styles.vertDelimiter}></div>
            <div className={styles.customColor}>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
};
