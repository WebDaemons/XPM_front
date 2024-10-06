import React, { useEffect } from 'react';
import {
  TabsBar,
  SettingsProfile,
  SettingsPassword,
  SettingsAppearance,
} from '@components/index';
import { tabs } from './tab.data';
import { useLocation } from 'react-router-dom';
import styles from './settings.module.css';

export const Settings = () => {
  const location = useLocation();

  const settingsMap = {
    '/settings/profile': <SettingsProfile />,
    '/settings/password': <SettingsPassword />,
    // '/settings/notifications': <SettingsNotifications />,
    '/settings/appearance': <SettingsAppearance />,
  };

  return (
    <div
      className={styles.wrapper}
    >
      <TabsBar tabs={tabs} />
      {settingsMap[location.pathname]}
    </div>
  );
};
