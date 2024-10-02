import React, { useState, useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import styles from './colorPicker.module.css';

export const ColorPicker = ({ onColorChange }) => {
  const [color, setColor] = useState('#aabbcc');
  const timeoutRef = useRef(null);

  const handleColorChange = (color) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setColor(color);
      onColorChange(color);
    }, 1000);
  };

  return (
    <div className={styles.colorPicker}>
      <HexColorPicker
        color={color}
        onChange={handleColorChange}
        className={styles.colorPicker}
      />
    </div>
  );
};
