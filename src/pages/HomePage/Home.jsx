import React from 'react';
import styles from './home.module.css';
import { CgArrowLongRight } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.homeHeader}>
        <h1 className={styles.homeName}>
          <span style={{ color: '#1B76FF' }}>XP</span>Manager
        </h1>
        <NavLink
          to="/login"
          key="Login"
        >
          <button className={styles.homeButton}>Sign In</button>
        </NavLink>
      </div>
      <div className={styles.homeContent}>
        <p className={styles.homeGreatings}>Greetings User</p>
        <div className={styles.homeRegisterHint}>
          <div className={styles.homeHint}>if you are new here, start here</div>
          <CgArrowLongRight size={50} />
          <NavLink
            to="/signup"
            key="Registration"
          >
            <button className={styles.homeButton}>Register</button>
          </NavLink>
        </div>
        <div className={styles.homeInfoContainer}>
          <div className={styles.homeInfo}>
            <p style={{ fontWeight: '700' }}>What we did</p>
            <p>Basic user settings</p>
            <p>Basic theme swich</p>
            <p>To-do list</p>
            <p>Notes</p>
          </div>
          <div className={styles.homeInfo}>
            <p style={{ fontWeight: '700' }}>What were going to do</p>
            <p>Share your to-do`s and notes</p>
            <p>Responsive mobile design</p>
            <p>Custom theme</p>
            <p>Kanban board</p>
          </div>
        </div>
      </div>
    </div>
  );
}
