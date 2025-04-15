import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { ColorPicker } from '@components/index';
import { adjustBrightness } from '@utils/adjustBrightness';
import styles from './AddEditNote/addEditNote.module.css';

export const TagManager = ({
  currentTags,
  setCurrentTags,
  selectedColor,
  setSelectedColor,
}) => {
  const [tagName, setTagName] = useState('');
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const handleAddTag = () => {
    console.log('smth');
    if (!tagName) return;
    setCurrentTags([...currentTags, { name: tagName, color: selectedColor }]);
    setTagName('');
  };

  const handleDeleteTag = (name) => {
    setCurrentTags(currentTags.filter((tag) => tag.name !== name));
  };

  return (
    <div className={styles.tagsWrapper}>
      <label className={styles.label}>TAGS</label>
      <div className={styles.tags}>
        {currentTags.map((tag) => (
          <div
            key={tag.name}
            className={styles.tag}
            style={{
              backgroundColor: 'transparent',
              color: tag.color,
              border: `1px solid ${tag.color}`,
            }}
          >
            {tag.name}
            <X
              className={styles.clearTag}
              onClick={() => handleDeleteTag(tag.name)}
            />
          </div>
        ))}
      </div>
      <div className={styles.addTagWrapper}>
        <input
          type="text"
          className={styles.inputTag}
          placeholder="Enter tag name..."
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />
        <div
          className={styles.choosenColor}
          style={{ backgroundColor: selectedColor }}
          onClick={() => setIsColorPickerVisible(!isColorPickerVisible)}
        ></div>
        <button
          className={styles.addTagButton}
          type="button"
          onClick={handleAddTag}
        >
          <Plus />
        </button>
        {isColorPickerVisible && (
          <div className={styles.colorPicker}>
            <ColorPicker onColorChange={(color) => setSelectedColor(color)} />
          </div>
        )}
      </div>
    </div>
  );
};
