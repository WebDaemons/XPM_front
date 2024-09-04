import React from 'react';
import {
  TabsBar,
  SettingsProfile,
  SettingsPassword,
  SettingsAppearance,
} from '@components/index';
import { tabs } from './tab.data';
import { useLocation } from 'react-router-dom';

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
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '25px',
        gap: '25px',
        width: '100%',
      }}
    >
      <TabsBar tabs={tabs} />
      {settingsMap[location.pathname]}
    </div>
  );
};
