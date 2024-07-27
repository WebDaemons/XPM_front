import React from 'react';
import styles from './sidebar.module.css';
import { useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { LuListTodo } from 'react-icons/lu';
import { LiaStickyNoteSolid } from 'react-icons/lia';
import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div
      style={{
        width: isCollapsed ? '70px' : 'auto',
        transition: 'all 0.5s ease',
        backgroundColor: '#121212',
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
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
      <nav
        style={{
          marginTop: '15px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <NavLink
          to="/todo"
          className={styles.navLinkItem}
        >
          <LuListTodo
            size={24}
            color="#ffffff"
          />
          {!isCollapsed && <span>Todolist</span>}
        </NavLink>
        <NavLink
          to="/notes"
          className={styles.navLinkItem}
        >
          <LiaStickyNoteSolid
            size={24}
            color="#ffffff"
          />
          {!isCollapsed && <span>Notes</span>}
        </NavLink>
        <NavLink
          to="/settings"
          className={styles.navLinkItem}
        >
          <IoSettingsOutline
            size={24}
            color="#ffffff"
          />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
      </nav>
    </div>
  );
};
