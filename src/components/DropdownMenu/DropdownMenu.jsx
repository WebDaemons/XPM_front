import { useEffect, useRef, useState } from 'react';
import styles from './dropdownMenu.module.css';

export const DropdownMenu = ({ trigger, items = [], align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className={styles.dropdownWrapper}
      onClick={(e) => {
        e.stopPropagation();
        toggleMenu();
      }}
    >
      {trigger}
      {isOpen && (
        <div
          className={`${styles.dropdownMenu} ${
            align === 'left' ? styles.dropdownLeft : styles.dropdownRight
          }`}
        >
          {items.map((item, index) => {
            if (item.type === 'divider') {
              return (
                <div
                  key={index}
                  className={styles.dropdownDivider}
                />
              );
            }
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={`${styles.dropdownItem} ${
                  item.danger ? styles.danger : ''
                } ${item.warning ? styles.warning : ''}`}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
              >
                {Icon && (
                  <span className={styles.dropdownItemIcon}>
                    <Icon />
                  </span>
                )}

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
