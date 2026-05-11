import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { useAuth } from '@context/AuthContext';
import { getUserAction } from '@store/slices/userSlice';

import { navElements } from './nav.data';

import styles from './sidebar.module.css';
import { CiMenuFries, MdLogout } from '@ui/icons';

export const Sidebar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(!isCollapsed);
  const location = useLocation();

  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const name = useSelector((state) => state.user.name);
  const surname = useSelector((state) => state.user.surname);
  const status = useSelector((state) => state.user.status);
  // const image = useSelector((state) => state.user.image);
  // const error = useSelector((state) => state.user.error);

  const { logout } = useAuth();

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    onToggle(!isCollapsed);
  };

  useEffect(() => {
    if (!isCollapsed) {
      const t = setTimeout(() => setShowUserInfo(true), 200);
      return () => clearTimeout(t);
    } else {
      setShowUserInfo(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUserAction());
    }
  }, [dispatch, status]);

  return (
    <div
      className={styles.sidebarWrapper}
      style={{
        width: isCollapsed ? '70px' : '270px',
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
              <NavLink to="/todo">
                <span style={{ color: '#1B76FF' }}>XP</span>Manager
              </NavLink>
            </h1>
          )}
          <button
            className={styles.friesBtn}
            style={{
              padding: isCollapsed ? '20px' : '15px',
              maxHeight: isCollapsed ? '70px' : '60px',
            }}
            onClick={handleToggle}
          >
            <span className={styles.friesBtnWrapper}>
              <CiMenuFries />
            </span>
          </button>
        </div>
        <nav className={styles.navLink}>
          {navElements.map((navElement) => {
            const Icon = navElement.icon;

            return (
              <NavLink
                to={navElement.link}
                key={navElement.link}
                className={`${styles.navLinkItem} ${
                  location.pathname === navElement.link ? styles.active : ''
                }`}
              >
                <Icon
                  size={30}
                  color="#ffffff"
                />
                <span className={isCollapsed ? styles.hidden : ''}>
                  {navElement.title}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div
        className={styles.sidebarBottom}
        style={{
          justifyContent: isCollapsed ? 'center' : 'space-between',
          flexDirection: isCollapsed ? 'column' : 'row',
          gap: isCollapsed ? '20px' : '0px',
          paddingRight: isCollapsed ? '15px' : '0',
        }}
      >
        <div
          className={styles.userIcon}
          style={{ marginRight: isCollapsed ? '0' : '5px' }}
        >
          <img src="/src/assets/pfp.jpeg" />
        </div>
        <div
          className={`${styles.userInfo} ${!showUserInfo ? styles.hiddenInfo : ''}`}
          style={{
            display: isCollapsed ? 'none' : '',
          }}
        >
          <p>{name + ' ' + surname}</p>
          <p>{email}</p>
        </div>
        <button
          className={styles.logoutBtn}
          onClick={logout}
          style={{ marginRight: isCollapsed ? '-6px' : '8px' }}
        >
          <span className={styles.logoutBtnWrapper}>
            <MdLogout />
          </span>
        </button>
      </div>
    </div>
  );
};
