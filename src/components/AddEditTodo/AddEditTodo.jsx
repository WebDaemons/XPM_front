import React, { useEffect, useState } from 'react';
import styles from './addEditTodo.module.css';
import { IoIosClose, MdOutlineDelete, HiFlag } from '@ui/icons';
import { Button, DropDown } from '@ui/index';
import { DatePick } from '@components/index';
import { useTodolist } from '@hooks/useTodolist';
import { formatDate } from '@utils/formatDate';

export const AddEditTodo = ({
  isOpen,
  onClose,
  type,
  task,
  categoryOptions,
}) => {
  const [token] = useState(localStorage.getItem('token'));
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const { handleAddTask, handleDeleteTask, handleEditTask } =
    useTodolist(token);

  const options = [
    { value: 'N', label: 'Select priority', color: 'black' },
    { value: 'H', label: 'High', color: 'red' },
    { value: 'M', label: 'Medium', color: 'orange' },
    { value: 'L', label: 'Low', color: 'green' },
  ];

  useEffect(() => {
    if (task) {
      setName(task.name || '');
      setCategory(task.category || '');
      setDueDate(task.due_date || '');
      setPriority(getPriorityLabel(task.priority) || '');
    } else {
      setName('');
      setCategory('');
      setDueDate('');
      setPriority('');
    }
  }, [task]);

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
      if (name === '') return;
      const data = {
        name,
        // due_date: dueDate,
        priority,
        category,
      };
      console.log(task.id, data);
      handleEditTask(task.id, data);
    } else {
      if (name === '') return;
      handleAddTask(name);
    }
    setName('');
    onClose();
  };

  const handleDelete = () => {
    handleDeleteTask(task.id);
    setName('');
    onClose();
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleCategorySelect = (option) => {
    setCategory(option.id);
  };

  const handlePrioritySelect = (option) => {
    setPriority(option.value);
  };

  const handleDateChange = (date) => {
    setDueDate(formatDate(date));
    console.log(formatDate(date));
  };

  const getPriorityLabel = (value) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : '';
  };

  const getCategoryName = (value) => {
    const option = categoryOptions.find((opt) => opt.id === value);
    return option ? option.label : '';
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <p
            className={styles.modalType}
          >{`${type === 'add' ? 'Add' : 'Edit'} task...`}</p>
          <div className={styles.noteTools}>
            {type === 'edit' ? (
              <>
                <MdOutlineDelete
                  className={styles.navBtn}
                  onClick={handleDelete}
                />
                <IoIosClose
                  className={styles.navBtn}
                  onClick={handleCloseModal}
                />
              </>
            ) : (
              <IoIosClose
                className={styles.navBtn}
                onClick={handleCloseModal}
              />
            )}
          </div>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.contentWrapper}>
            <label className={styles.label}>CONTENT</label>
            <textarea
              className={styles.content}
              placeholder="Enter content..."
              rows={7}
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></textarea>
          </div>
          <div className={styles.categoryWrapper}>
            <label className={styles.label}>CATEGORY</label>
            <div className={styles.category}>
              <DropDown
                options={categoryOptions}
                onOptionSelect={handleCategorySelect}
                placeholder={getCategoryName(task.category)}
              />
            </div>
          </div>
          <div className={styles.datePriorityWrapper}>
            <div className={styles.dateWrapper}>
              <label className={styles.label}>DUE DATE</label>
              <div className={styles.dueDate}>
                <DatePick onDateChange={handleDateChange} />
              </div>
            </div>
            <div className={styles.priorityWrapper}>
              <label className={styles.label}>PRIORITY</label>
              <div className={styles.priority}>
                {' '}
                <DropDown
                  options={options}
                  onOptionSelect={handlePrioritySelect}
                  placeholder={getPriorityLabel(task.priority)}
                  icon={HiFlag}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button
            variant="outlined"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};
