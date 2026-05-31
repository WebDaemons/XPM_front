import { useState } from 'react';
import styles from './tagManager.module.css';
import { IoMdClose } from 'react-icons/io';
import { HiHashtag } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { hexToRgba } from '@utils/hexToRgba';
import { Plus } from 'lucide-react';

export const TagManager = ({ tags }) => {
  const [tagManagerState, setTagManagerState] = useState('searchTag');

  return (
    <div className={styles.tagManagerWrapper}>
      <div className={styles.mainView}>
        <h3>Tags</h3>
        <ul className={styles.currentTagsList}>
          {tags.map((tag) => (
            <li
              className={styles.tag}
              key={tag.id}
              style={{
                color: tag.color,
                backgroundColor: hexToRgba(tag.color, 0.075),
              }}
            >
              <span className={styles.hashIcon}>
                <HiHashtag />
              </span>
              <span className={styles.tagName}>{tag.name}</span>
              <span className={styles.closeIcon}>
                <IoMdClose />
              </span>
            </li>
          ))}
          <button className={styles.openSearchbarBtn}>
            <span>
              <Plus />
            </span>
          </button>
        </ul>
      </div>
      <div className={styles.searchTagWrapper}>
        <span>
          <HiHashtag />
        </span>
        <input
          type="text"
          placeholder="Add tags..."
        />
      </div>
      <div className={styles.expandedTagsMenu}>
        <span className={styles.tagType}>Recent</span>
        <ul className={styles.availableTagsList}>
          <li className={styles.availableTag}>
            <span
              style={{
                color: '#800080',
                // backgroundColor: hexToRgba('#800080', 0.075),
                backgroundColor: '#f7eef6',
              }}
            >
              <HiHashtag />
            </span>
            Job
          </li>
          <li className={styles.availableTag}>
            <span
              style={{
                color: '#fa8008',
                backgroundColor: hexToRgba('#fa8008', 0.075),
              }}
            >
              <HiHashtag />
            </span>
            Sport
          </li>
          <li className={styles.availableTag}>
            <span
              style={{
                color: '#1f790f',
                backgroundColor: hexToRgba('#1f790f', 0.075),
              }}
            >
              <HiHashtag />
            </span>
            Programmin
          </li>
        </ul>
        <div className={styles.addNewTag}>
          <span>
            <Plus />
          </span>
          Add new tag
        </div>
      </div>
    </div>
  );
};
