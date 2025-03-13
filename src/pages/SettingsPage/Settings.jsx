import React from 'react';
import { TabsBar } from '@components/index';
import { SettingsProfile } from '@features/settings/components/SettingsProfile/SettingsProfile';
import { SettingsAppearance } from '@features/settings/components/SettingsAppearance/SettingsAppearance';
import { SettingsPassword } from '@features/settings/components/SettingsPassword/SettingsPassword';
import { tabs } from './tab.data';
import { useLocation, Navigate } from 'react-router-dom';
import styles from './settings.module.css';

export default function Settings() {
  const location = useLocation();

  const settingsMap = {
    '/settings/profile': <SettingsProfile />,
    '/settings/password': <SettingsPassword />,
    // '/settings/notifications': <SettingsNotifications />,
    '/settings/appearance': <SettingsAppearance />,
  };

  if (location.pathname === '/settings') {
    return <Navigate to="/settings/profile" />; // Редирект на профиль
  }

  return (
    <div className={styles.wrapper}>
      <TabsBar tabs={tabs} />
      {settingsMap[location.pathname]}
    </div>
  );
}
