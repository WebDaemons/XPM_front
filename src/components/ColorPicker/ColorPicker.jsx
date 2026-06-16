import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import styles from './colorPicker.module.css';

const PRESET_COLORS = [
  '#4F7CFF',
  '#8B5CF6',
  '#22C55E',
  '#F59E0B',
  '#FF6B6B',
  '#EC4899',
  '#06B6D4',
];

export function ColorPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.presets}>
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            className={`${styles.colorBtn} ${
              value === color ? styles.active : ''
            }`}
            style={{ background: color }}
            onClick={() => onChange(color)}
          />
        ))}

        <button
          type="button"
          className={styles.customBtn}
          onClick={() => setOpen((prev) => !prev)}
        >
          +
        </button>
      </div>

      {open && (
        <div className={styles.popover}>
          <HexColorPicker
            color={value}
            onChange={onChange}
          />

          <div className={styles.footer}>
            <div
              className={styles.preview}
              style={{ background: value }}
            />

            <input
              className={styles.input}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
