import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datePick.module.css';

export const DatePick = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
    onDateChange(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      className={styles.customDatepicker}
      calendarClassName={styles.customCalendar}
    />
  );
};
