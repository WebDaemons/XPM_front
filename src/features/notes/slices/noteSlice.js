import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getNotes,
  deleteNote,
  createNote,
  updateNote,
  getTags,
  createTag,
  deleteTag,
} from '@features/notes/api/noteApi';

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (token, { rejectWithValue }) => {
    try {
      return await getNotes(token);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const addNote = createAsyncThunk(
  'notes/addNote',
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await createNote(token, data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const removeNote = createAsyncThunk(
  'notes/removeNote',
  async ({ token, id }, { rejectWithValue }) => {
    try {
      await deleteNote(token, id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const editNote = createAsyncThunk(
  'notes/editNote',
  async ({ token, data, id }, { rejectWithValue }) => {
    try {
      return await updateNote(token, data, id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const fetchTags = createAsyncThunk(
  'notes/fetchTags',
  async (token, { rejectWithValue }) => {
    try {
      return await getTags(token);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const addTag = createAsyncThunk(
  'notes/addTag',
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await createTag(token, data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const removeTag = createAsyncThunk(
  'notes/removeTag',
  async ({ token, id }, { rejectWithValue }) => {
    try {
      await deleteTag(token, id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    tags: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      })
      .addCase(removeNote.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id,
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(editNote.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addTag.fulfilled, (state, action) => {
        state.tags.push(action.payload);
      })
      .addCase(addTag.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeTag.fulfilled, (state, action) => {
        state.tags = state.tags.filter((tag) => tag.id !== action.payload);
      })
      .addCase(removeTag.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default noteSlice.reducer;
