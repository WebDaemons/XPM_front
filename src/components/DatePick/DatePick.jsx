import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datePick.module.css';

export const DatePick = ({ onDateChange, defaultDate }) => {
  const [startDate, setStartDate] = useState(defaultDate || new Date());

  useEffect(() => {
    if (defaultDate) {
      setStartDate(defaultDate);
    }
  }, [defaultDate]);

  const handleDateChange = (date) => {
    setStartDate(date);
    onDateChange(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      dateFormat="dd.MM.yyyy"
      className={styles.customDatepicker}
      calendarClassName={styles.customCalendar}
    />
  );
};
