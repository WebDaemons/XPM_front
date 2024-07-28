import React, { useState } from 'react';
import { PiDotsSixVertical } from 'react-icons/pi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RxDotsVertical } from 'react-icons/rx';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { TbLayoutKanban } from 'react-icons/tb';
import { FiList } from 'react-icons/fi';
import styles from './category.module.css';
import { Button } from '@ui/index';

export const Category = () => {
  function getCurrentFormattedDate() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}.${minutes}`;
  }

  const [isRotated, setIsRotated] = useState(false);

  const handleIconClick = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TbLayoutKanban size={20} />
            <span>Board</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiList size={20} />
            <span>List</span>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <Button
            label="+ Create task"
            variant="mainButton"
          />
          <Button
            label="+ Create category"
            variant="mainButton"
          />
        </div>
      </div> */}
      <div className={styles.categoryListItem}>
        <div className={styles.categoryHeader}>
          <PiDotsSixVertical
            size={24}
            color="#121212"
          />
          <MdKeyboardArrowDown
            size={24}
            color="#121212"
            style={{
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out',
              transform: isRotated ? 'rotate(0)' : 'rotate(-90deg)',
            }}
            onClick={handleIconClick}
            className={isRotated ? 'rotated' : ''}
          />
          <span className={styles.categoryName}>Work</span>
          <div className={styles.tasksCount}>5</div>
          <RxDotsVertical
            size={24}
            color="#121212"
          />
        </div>
        {isRotated && (
          <div className={styles.taskList}>
            <div className={styles.header}>
              <span style={{ flexGrow: '1' }}>Task name</span>
              <span style={{ width: '95px' }}>Status</span>
              <span style={{ width: '135px' }}>Due date</span>
              <span style={{ width: '150px' }}>Creation date</span>
            </div>
            <div className={styles.taskListItem}>
              <PiDotsSixVertical
                size={18}
                color="#121212"
                className={styles.dragIcon}
              />
              <input
                type="checkbox"
                style={{ margin: '0 7px' }}
              />
              <p
                className={styles.taskName}
                style={{ flexGrow: '1', whiteSpace: 'pre' }}
              >
                Create design system
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  padding: '5px',
                }}
              >
                <div
                  style={{
                    height: '7px',
                    width: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#00a426',
                  }}
                ></div>
                <span style={{}}>In progress</span>
              </div>
              <span
                style={{
                  display: 'flex',
                  width: '130px',
                }}
              >
                {getCurrentFormattedDate()}
              </span>
              <span style={{ width: '130px' }}>
                {getCurrentFormattedDate()}
              </span>
              <PiDotsThreeVerticalBold
                size={20}
                color="#121212"
                className={styles.editIcon}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
