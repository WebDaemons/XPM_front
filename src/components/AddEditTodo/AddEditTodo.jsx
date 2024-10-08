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
      setDueDate(task?.due_date || new Date());
      setPriority(task?.priority || 'N');
    } else {
      setName('');
      setCategory('');
      setDueDate('');
      setPriority('N');
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
        due_date: dueDate,
        priority,
        category,
      };
      handleEditTask(task.id, data);
    } else {
      if (name === '') return;
      const data = {
        name,
        due_date: dueDate,
        priority,
        category,
      };
      handleAddTask(data);
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
    console.log(date);
    setDueDate(date);
  };

  const getPriorityLabel = (value) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : '';
  };

  const getCategoryName = (value) => {
    const option = categoryOptions.find((opt) => opt.id === value);
    return option ? option.label : 'Select category';
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
                placeholder={
                  task ? getCategoryName(task.category) : 'Select category'
                }
              />
            </div>
          </div>
          <div className={styles.datePriorityWrapper}>
            <div className={styles.dateWrapper}>
              <label className={styles.label}>DUE DATE</label>
              <div className={styles.dueDate}>
                <DatePick
                  onDateChange={handleDateChange}
                  defaultDate={task?.due_date}
                />
              </div>
            </div>
            <div className={styles.priorityWrapper}>
              <label className={styles.label}>PRIORITY</label>
              <div className={styles.priority}>
                <DropDown
                  options={options}
                  onOptionSelect={handlePrioritySelect}
                  selectedValue={task?.priority || 'N'}
                  placeholder={
                    task
                      ? getPriorityLabel(task.priority)
                      : getPriorityLabel('N')
                  }
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
