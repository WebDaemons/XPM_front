import React, { useRef, useEffect } from 'react';
import styles from './sidebar.module.css';
import { useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';
import { navElements } from './nav.data';
import { IoSearch } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!isCollapsed && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isCollapsed]);

  return (
    <div
      className={styles.sidebarWrapper}
      style={{
        width: isCollapsed ? '70px' : '250px',
      }}
    >
      <div className={styles.sidebarTop}>
        <div
          className={styles.sidebarHeader}
          style={{
            justifyContent: isCollapsed ? 'center' : 'space-between',
          }}
        >
          {!isCollapsed && (
            <h1 className={styles.siteName}>
              <span style={{ color: '#1B76FF' }}>XP</span>Manager
            </h1>
          )}
          <CiMenuFries
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            size={32}
            color="#fff"
            style={{
              cursor: 'pointer',
            }}
          />
        </div>
        <div className={styles.searchElement}>
          {isCollapsed ? (
            <IoSearch
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}
              className={styles.inputIcon}
              color="#fff"
              size={32}
              style={{
                cursor: 'pointer',
              }}
            />
          ) : (
            <input
              ref={searchRef}
              className={styles.searchInput}
              type="text"
              placeholder="Search..."
              style={{
                width: isCollapsed ? '70px' : '225px',
              }}
            />
          )}
        </div>
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
      <div
        className={styles.sidebarBottom}
        style={{
          justifyContent: isCollapsed ? 'center' : 'space-between',
        }}
      >
        {!isCollapsed && (
          <div className={styles.userInfo}>
            <p
              style={{
                fontSize: '20px',
                color: '#fff',
              }}
            >
              Nazarii Yankiv
            </p>
            <p
              style={{
                fontSize: '16px',
                color: '#1B76FF',
              }}
            >
              nazar2k10@gmail.com
            </p>
          </div>
        )}
        <MdLogout
          color="#fff"
          size={32}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
