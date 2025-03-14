import { useState, useEffect } from 'react';
import { useNotes } from '@features/notes/hooks/useNotes';

export const useNoteForm = (note, type, onClose) => {
  const [token] = useState(localStorage.getItem('token'));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentTags, setCurrentTags] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#aabbcc');
  const [isTagAddVisible, setIsAddTagVisible] = useState(false);
  const [isNotePinned, setIsNotePinned] = useState(false);
  const { handleAddNote, handleEditNote, handleDeleteNote } = useNotes(token);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setCurrentTags(note.tags || []);
      setIsNotePinned(note.isPinned);
    }
  }, [note]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCurrentTags([]);
    setIsAddTagVisible(false);
    onClose();
  };

  const handleSave = () => {
    if (!title || !content) return;
    const data = { title, content, tags: currentTags };

    type === 'edit' ? handleEditNote(data, note.id) : handleAddNote(data);
    resetForm();
    onClose();
  };

  const handlePinned = () => {
    handleEditNote({ ...note, isPinned: !isNotePinned }, note.id);
    setIsNotePinned((prev) => !prev);
  };

  const handleDelete = () => {
    handleDeleteNote(note.id);
    resetForm();
    onClose();
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    currentTags,
    setCurrentTags,
    selectedColor,
    setSelectedColor,
    isTagAddVisible,
    setIsAddTagVisible,
    isNotePinned,
    handleSave,
    handlePinned,
    handleDelete,
    resetForm,
  };
};
