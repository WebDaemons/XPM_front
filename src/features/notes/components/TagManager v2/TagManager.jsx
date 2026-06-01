import { useState } from 'react';
import styles from './tagManager.module.css';
import { IoMdClose } from 'react-icons/io';
import { HiHashtag } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { hexToRgba } from '@utils/hexToRgba';
import { Plus } from 'lucide-react';
import { Button } from '@ui/index';
import { ColorPicker } from '@components/index';

export const TagManager = ({ tags }) => {
  const [tagManagerState, setTagManagerState] = useState('searchTag');
  const [isSearchTagOpened, setIsSearchTagOpened] = useState(false);
  const [color, setColor] = useState('#4F7CFF');

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
          <button
            className={styles.openSearchbarBtn}
            onClick={() => setIsSearchTagOpened((prev) => !prev)}
          >
            <span>
              <Plus
                style={{
                  transform: isSearchTagOpened ? 'rotate(45deg)' : '',
                }}
              />
            </span>
          </button>
        </ul>
      </div>
      {isSearchTagOpened && (
        <div className={styles.searchTagWrapper}>
          <span
            style={{
              color:
                tagManagerState == 'createTag' ? color : 'var(--text-color)',
            }}
          >
            <HiHashtag />
          </span>
          <input
            type="text"
            placeholder={
              tagManagerState == 'searchTag'
                ? 'Search tags...'
                : 'Create tag...'
            }
          />
        </div>
      )}
      {tagManagerState == 'searchTag' ? (
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
          <button
            className={styles.addNewTag}
            onClick={() => setTagManagerState('createTag')}
          >
            <span>
              <Plus />
            </span>
            Add new tag
          </button>
        </div>
      ) : (
        <div className={styles.creationTagWrapper}>
          <ColorPicker
            value={color}
            onChange={setColor}
          />
          <div className={styles.creationTagActionBtns}>
            <Button
              onClick={() => setTagManagerState('searchTag')}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button>Create</Button>
          </div>
        </div>
      )}
    </div>
  );
};
