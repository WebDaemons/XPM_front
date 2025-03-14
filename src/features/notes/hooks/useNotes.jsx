import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNotes,
  addNote,
  removeNote,
  editNote,
} from '@features/notes/slices/noteSlice';

export const useNotes = (token) => {
  const dispatch = useDispatch();
  const { notes, status, error } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes(token));
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

  return {
    notes,
    status,
    error,
    handleAddNote,
    handleDeleteNote,
    handleEditNote,
  };
};
