import React from 'react';
import { useDispatch } from 'react-redux';
import { addNote, removeNote, editNote } from '@slices/noteSlice';

export const useNotes = (token) => {
  const dispatch = useDispatch();

  // const handleAddNote = (data) => {
  //   const noteData = {
  //     title: data.title,
  //     value: data.value,
  //     tags: data.tags,
  //   };
  //   dispatch(addNote({ token, noteData }));
  // };
  const handleAddNote = (title, content, tags) => {
    const noteData = {
      title,
      content,
      tags,
    };
    dispatch(addNote({ token, noteData }));
  };

  const handleDeleteNote = (noteId) => {
    dispatch(removeNote({ token, noteId }));
  };

  const handleEditNote = (noteData, noteId) => {
    dispatch(editNote({ token, noteData, noteId }));
  };

  return {
    handleAddNote,
    handleDeleteNote,
    handleEditNote,
  };
};
