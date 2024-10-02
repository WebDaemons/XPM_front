import React, { useEffect, useState } from 'react';
import styles from './addEditNote.module.css';
import { IoIosClose, TbPinnedFilled, MdOutlineDelete, FiPlus } from '@ui/icons';
import { Button } from '@ui/index';
import { useNotes } from '@hooks/useNotes';
import { ColorPicker } from '@components/index';
import { adjustBrightness } from '@utils/adjustBrightness';

export const AddEditNote = ({ isOpen, onClose, type, note }) => {
  const [token] = useState(localStorage.getItem('token'));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentTags, setCurrentTags] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#aabbcc');
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [tagName, setTagName] = useState('');
  const { handleAddNote, handleEditNote } = useNotes(token);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setCurrentTags(note.tags || []);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (type === 'edit') {
      if (title === '' || content === '') return;
      console.log(currentTags);
      const data = {
        title,
        content,
        tags: currentTags,
      };
      console.log(data, note.id);
      handleEditNote(data, note.id);
    } else {
      if (title === '' || content === '') return;
      handleAddNote(title, content, currentTags);
    }
    setCurrentTags([]);
    onClose();
  };

  const handleOpenColorPicker = () => {
    setIsColorPickerVisible(!isColorPickerVisible);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setIsColorPickerVisible(false);
  };

  const handleAddTag = () => {
    if (tagName === '') return;
    const newTag = {
      name: tagName,
      color: selectedColor,
    };
    setCurrentTags([...currentTags, newTag]);
  };

  const handleDeleteTag = () => {};

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <p
            className={styles.modalType}
          >{`${type === 'add' ? 'Add' : 'Edit'} note...`}</p>
          <IoIosClose
            className={styles.navBtn}
            onClick={onClose}
          />
        </div>
        <div className={styles.modalBody}>
          <div className={styles.titleWrapper}>
            <label className={styles.label}>TITLE</label>
            <input
              type="text"
              placeholder="Enter title..."
              className={styles.title}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className={styles.contentWrapper}>
            <label className={styles.label}>CONTENT</label>
            <textarea
              className={styles.content}
              placeholder="Enter content..."
              rows={7}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
          </div>
          <div className={styles.tagsWrapper}>
            <label className={styles.label}>TAGS</label>
            <div className={styles.tags}>
              {currentTags?.map((tag) => (
                <div
                  key={tag.id}
                  className={styles.tag}
                  style={{
                    backgroundColor: `${tag.color}`,
                    color: adjustBrightness(tag.color, -40),
                  }}
                >
                  {tag.name}
                  <IoIosClose className={styles.clearTag} />
                </div>
              ))}
            </div>
            <div className={styles.addTagWrapper}>
              <input
                type="text"
                className={styles.inputTag}
                placeholder="Enter tag name..."
                onChange={(e) => setTagName(e.target.value)}
              />
              <div
                className={styles.choosenColor}
                style={{ backgroundColor: selectedColor }}
                onClick={handleOpenColorPicker}
              ></div>
              <button
                className={styles.addTagButton}
                type="button"
                onClick={handleAddTag}
              >
                <FiPlus />
              </button>
              {isColorPickerVisible && (
                <div className={styles.colorPicker}>
                  <ColorPicker onColorChange={handleColorChange} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button
            variant="outlined"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};
