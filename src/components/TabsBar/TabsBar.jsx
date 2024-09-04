import React, { useState } from 'react';
import styles from './tabsBar.module.css';
import { NavLink } from 'react-router-dom';

export const TabsBar = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].link);

  const handleTabClick = (link) => {
    setActiveTab(link);
  };

  return (
    <div className={styles.wrapper}>
      {tabs.map((tab) => (
        <NavLink
          to={tab.link}
          key={tab.label}
          className={`${styles.tabItem} ${activeTab === tab.link ? styles.active : ''}`}
          onClick={() => handleTabClick(tab.link)}
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
};
