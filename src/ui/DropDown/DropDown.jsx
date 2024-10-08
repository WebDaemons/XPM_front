import React, { useState, useRef, useEffect } from 'react';
import styles from './dropDown.module.css';

export const DropDown = ({
  icon: Icon,
  options,
  onOptionSelect,
  placeholder,
  selectedValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (selectedValue) {
      const option = options.find((opt) => opt.value === selectedValue);
      setSelectedOption(option);
    }
  }, [selectedValue]);

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
        {Icon && selectedOption ? (
          <Icon color={selectedOption.color} />
        ) : (
          Icon && <Icon color="black" />
        )}
        {selectedOption ? selectedOption.label : placeholder}
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.dropdownMenuItem}
              onClick={() => handleOptionClick(option)}
            >
              {Icon && <Icon color={option.color} />}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
