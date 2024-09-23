import React, { useState, useRef, useEffect } from 'react';
import styles from './dropDown.module.css';
import { HiOutlineFlag, HiFlag } from '@ui/icons';

export const DropDown = ({ options, onOptionSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className={styles.dropdown}
      ref={dropdownRef}
    >
      <div
        className={styles.dropdownHeader}
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.dropdownMenuItem}
              onClick={() => handleOptionClick(option)}
              style={{ color: options.color }}
            >
              <HiFlag color={option.color} />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
