import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getLists,
  createList,
  deleteList,
  updateList,
} from '@features/lists/api/listApi';

export const fetchLists = createAsyncThunk(
  'lists/fetchLists',
  async (token, { rejectedWithValue }) => {
    try {
      const data = await getLists(token);
      return data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  },
);

export const addList = createAsyncThunk(
  'lists/addList',
  async ({ token, listData }, { rejectedWithValue }) => {
    try {
      const data = await createList(token, listData);
      return data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  },
);

export const removeList = createAsyncThunk(
  'lists/removeList',
  async ({ token, listId }, { rejectedWithValue }) => {
    try {
      await deleteList(token, listId);
      return listId;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  },
);

export const editList = createAsyncThunk(
  'lists/editList',
  async ({ token, listId, listData }, { rejectedWithValue }) => {
    try {
      const data = await updateList(token, listData, listId);
      return data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  },
);

const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    lists: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(addList.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeList.fulfilled, (state, action) => {
        state.lists = state.lists.filter((list) => list.id !== action.payload);
      })
      .addCase(removeList.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(editList.fulfilled, (state, action) => {
        const index = state.lists.findIndex(
          (list) => list.id === action.payload.id,
        );
        if (index !== -1) {
          state.lists[index] = action.payload;
        }
      })
      .addCase(editList.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default listsSlice.reducer;
