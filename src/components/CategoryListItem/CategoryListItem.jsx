import React from 'react';
import styles from './categoryListItem.module.css';
import {
  PiDotsSixVertical,
  MdKeyboardArrowDown,
  RxDotsVertical,
} from '@ui/icons';

export const CategoryListItem = (categories) => {
  return (
    <div
      className={styles.categoryListItem}
      key={categoryElement.id}
    >
      <div className={styles.categoryHeader}>
        <PiDotsSixVertical
          size={24}
          color="#121212"
        />
        <MdKeyboardArrowDown
          size={24}
          color="#121212"
          className={`${styles.showTasksIcon} ${rotatedStates[index] ? 'rotated' : ''}`}
          style={{
            transform: rotatedStates[index] ? 'rotate(0)' : 'rotate(-90deg)',
          }}
          onClick={() => handleArrowClick(index)}
        />
        <span className={styles.categoryName}>{categoryElement.name}</span>
        <div className={styles.tasksCount}>
          {getTaskCount(categoryElement.id)}
        </div>
        <RxDotsVertical
          size={20}
          color="#121212"
          style={{ cursor: 'pointer' }}
          onClick={() => handleDeleteCategory(categoryElement.id)}
        />
      </div>
      {rotatedStates[index] && (
        <div className={styles.taskList}>
          {!!getTaskCount(categoryElement.id) && (
            <div className={styles.taskListHeader}>
              <span style={{ marginLeft: '25px', flexGrow: 1 }}>Task name</span>
              <div className={styles.taskHeaderInfoWrapper}>
                <div className={styles.taskHeaderInfo}>Priority</div>
                <div className={styles.taskHeaderInfo}>Due date</div>
                <div className={styles.taskHeaderInfo}>Created at</div>
              </div>
              <div style={{ width: '16px', height: '16px' }}></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
