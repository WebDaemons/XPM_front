import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNotes,
  addNote,
  removeNote,
  editNote,
  fetchTags,
  addTag,
  removeTag,
} from '@features/notes/slices/noteSlice';

export const useNotes = (token) => {
  const dispatch = useDispatch();
  const { notes, tags, status, error } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes(token));
    dispatch(fetchTags(token));
  }, [dispatch, token]);

  const handleAddNote = (data) => {
    dispatch(addNote({ token, data }));
  };

  const handleDeleteNote = (id) => {
    dispatch(removeNote({ token, id }));
  };

  const handleEditNote = (data, id) => {
    dispatch(editNote({ token, data, id }));
  };

  const handleDuplicateNote = (data) => {
    dispatch(addNote({ token, data }));
  };

  const handleDeleteTag = (id) => {
    dispatch(removeTag({ token, id }));
  };

  const handleAddTag = (data) => {
    dispatch(addTag({ token, data }));
  };

  return {
    notes,
    tags,
    status,
    error,
    handleAddNote,
    handleDeleteNote,
    handleEditNote,
    handleDuplicateNote,
    handleAddTag,
    handleDeleteTag,
  };
};
