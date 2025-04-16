import React, { useRef, useEffect } from 'react';
import styles from './sidebar.module.css';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navElements } from './nav.data';
import { useAuth } from '../../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAction } from '../../store/slices/userSlice';
import { CiMenuFries, IoSearch, MdLogout } from '@ui/icons';

export const Sidebar = () => {
  const location = useLocation();
  console.log(location.pathname);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const searchRef = useRef(null);

  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const name = useSelector((state) => state.user.name);
  const surname = useSelector((state) => state.user.surname);
  const image = useSelector((state) => state.user.image);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const { logout } = useAuth();

  useEffect(() => {
    if (!isCollapsed && searchRef.current) {
      searchRef.current.focus();
    }
    if (status === 'idle') {
      dispatch(getUserAction());
    }
  }, [dispatch, status, isCollapsed]);

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
              <span style={{ color: '#1B76FF' }}>XP</span>Azakana
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
        {/* <div className={styles.searchElement}>
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
        </div> */}
        <nav className={styles.navLink}>
          {navElements.map((navElement) => (
            <NavLink
              to={navElement.link}
              key={navElement.title}
              className={`${styles.navLinkItem} ${location.pathname === navElement.link ? styles.active : ''}`}
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
              {name + ' ' + surname}
            </p>
            <p
              style={{
                fontSize: '16px',
                color: '#1B76FF',
              }}
            >
              {email}
            </p>
          </div>
        )}
        <MdLogout
          color="#fff"
          size={32}
          style={{
            cursor: 'pointer',
          }}
          onClick={logout}
        />
      </div>
    </div>
  );
};
