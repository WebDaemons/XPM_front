import { useState } from 'react';
import styles from './notesToolBar.module.css';
import { LuFilter } from 'react-icons/lu';
import { RxDashboard } from 'react-icons/rx';
import { IoListOutline } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';

export const NotesToolbar = () => {
  const [viewType, setViewType] = useState('board');

  return (
    <div className={styles.notesToolbarWrapper}>
      <div className={styles.searchFieldWrapper}>
        <span>
          <FiSearch />
        </span>
        <input
          type="text"
          placeholder="Search notes..."
        />
      </div>
      <button className={styles.filterBtn}>
        <span className={styles.filterIcon}>
          <LuFilter />
        </span>
      </button>
      <div className={styles.sortDropdownMenu}>
        <div className={styles.sortSelect}>
          <span className={styles.sortSelected}>Newest</span>
          <span className={styles.arrowIcon}>
            <IoIosArrowDown />
          </span>
        </div>
      </div>
      <div className={styles.viewSwitcher}>
        <button
          className={styles.viewSwitchBtn}
          onClick={() => setViewType('board')}
          style={{
            backgroundColor: viewType == 'board' ? '#f4f9ff' : 'transparent',
          }}
        >
          <span
            style={{
              color: viewType == 'board' ? '#000' : 'var(--text-color)',
            }}
          >
            <RxDashboard />
          </span>
        </button>
        <button
          className={styles.viewSwitchBtn}
          onClick={() => setViewType('list')}
          style={{
            backgroundColor: viewType == 'list' ? '#f4f9ff' : 'transparent',
          }}
        >
          <span
            style={{
              color: viewType == 'list' ? '#000' : 'var(--text-color)',
            }}
          >
            <IoListOutline />
          </span>
        </button>
      </div>
    </div>
  );
};
