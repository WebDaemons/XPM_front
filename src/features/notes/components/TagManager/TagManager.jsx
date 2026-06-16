import { useState } from 'react';
import styles from './tagManager.module.css';
import { IoMdClose } from 'react-icons/io';
import { HiHashtag } from 'react-icons/hi';
import { hexToRgba } from '@utils/hexToRgba';
import { Plus } from 'lucide-react';
import { Button } from '@ui/index';
import { ColorPicker } from '@components/index';
import { useNotes } from '../../hooks/useNotes';

export const TagManager = ({ currentTags, setCurrentTags, availableTags }) => {
  const [tagName, setTagName] = useState('');
  const [mode, setMode] = useState('search');
  const [isSearchTagOpened, setIsSearchTagOpened] = useState(false);
  const [color, setColor] = useState('#4F7CFF');

  const [token] = useState(localStorage.getItem('token'));
  const { handleDeleteTag: tagDelete, handleAddTag } = useNotes(token);

  const deleteAllTags = () => {
    availableTags.forEach((tag) => {
      tagDelete(tag.id);
    });
  };

  const handleAddExistingTag = (tag) => {
    const alreadyExists = currentTags.some((item) => item.id === tag.id);

    if (alreadyExists) return;

    setCurrentTags([...currentTags, tag]);
  };

  const handleCreateTag = () => {
    if (!tagName) return;
    handleAddTag({ name: tagName, color });
    // setCurrentTags([...currentTags, { name: tagName, color }]);
    setTagName('');
    setMode('search');
  };

  function handleDeleteTag(name) {
    setCurrentTags(currentTags.filter((tag) => tag.name !== name));
  }

  return (
    <div className={styles.tagManagerWrapper}>
      <div className={styles.mainView}>
        <h3>Tags</h3>
        <ul className={styles.currentTagsList}>
          {currentTags.map((tag) => (
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
              <button
                className={styles.deleteTagBtn}
                style={{ color: tag.color }}
                onClick={() => handleDeleteTag(tag.name)}
              >
                <span className={styles.closeIcon}>
                  <IoMdClose />
                </span>
              </button>
            </li>
          ))}
          <button
            className={styles.openSearchbarBtn}
            onClick={() => {
              setIsSearchTagOpened((prev) => !prev);
              if (!isSearchTagOpened) {
                setMode('search');
              }
            }}
          >
            <span>
              <Plus
                style={{
                  transform: isSearchTagOpened
                    ? 'rotate(45deg)'
                    : 'rotate(0deg)',
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
              color: mode == 'create' ? color : 'var(--text-color)',
            }}
          >
            <HiHashtag />
          </span>
          <input
            autoFocus
            type="text"
            placeholder={mode == 'create' ? 'Create tag...' : 'Search tags...'}
            onFocus={() => (mode == 'none' ? setMode('search') : '')}
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
        </div>
      )}
      {isSearchTagOpened && (
        <>
          {mode == 'search' && (
            <div className={styles.expandedTagsMenu}>
              {/* <span className={styles.tagType}>Recent</span> */}
              <ul className={styles.availableTagsList}>
                {availableTags.map((tag) => (
                  <li
                    key={tag.id ?? tag.name}
                    className={styles.availableTag}
                    onClick={() => handleAddExistingTag(tag)}
                  >
                    <span
                      style={{
                        color: tag.color,
                        backgroundColor: hexToRgba(tag.color, 0.075),
                      }}
                    >
                      <HiHashtag />
                    </span>
                    {tag.name}
                  </li>
                ))}
              </ul>
              <button
                className={styles.addNewTag}
                onClick={() => setMode('create')}
              >
                <span>
                  <Plus />
                </span>
                Add new tag
              </button>
            </div>
          )}
          {mode == 'create' && (
            <div className={styles.creationTagWrapper}>
              <ColorPicker
                value={color}
                onChange={setColor}
              />
              <div className={styles.creationTagActionBtns}>
                <Button
                  onClick={() => setMode('search')}
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateTag}>Create</Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
