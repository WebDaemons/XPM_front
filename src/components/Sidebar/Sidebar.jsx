import React from 'react';
import styles from './sidebar.module.css';
import { useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';
import { navElements } from './nav.data';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div
      className={styles.sidebarWrapper}
      style={{
        width: isCollapsed ? '70px' : '180px',
      }}
    >
      <CiMenuFries
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
        size={24}
        color="#fff"
        style={{
          cursor: 'pointer',
          marginTop: '15px',
        }}
      />
      <nav className={styles.navLink}>
        {navElements.map((navElement) => (
          <NavLink
            to={navElement.link}
            key={navElement.title}
            className={styles.navLinkItem}
          >
            {navElement.icon}
            {!isCollapsed && <span>{navElement.title}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
