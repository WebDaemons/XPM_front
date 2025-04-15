import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createListItem,
  deleteListItem,
  updateListItem,
} from '@features/lists/api/listItemApi';

export const addListItem = createAsyncThunk(
  'listItems/addListItem',
  async ({ token, listItemData }, { rejectedWithValue }) => {
    try {
      const data = await createListItem(token, listItemData);
      return data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  },
);

export const removeListItem = createAsyncThunk(
  'listItems/removeListItem',
  async ({ token, listItemId }, { rejectedWithValue }) => {
    try {
      await deleteListItem(token, listItemId);
      return listItemId;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  },
);

export const editListItem = createAsyncThunk(
  'listItems/editListItem',
  async ({ token, listItemId, listItemData }, { rejectedWithValue }) => {
    try {
      const data = await updateListItem(token, listItemData, listItemId);
      return data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  },
);

const listItemsSlice = createSlice({
  name: 'listItems',
  initialState: {
    listItems: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addListItem.fulfilled, (state, action) => {
        state.listItems.push(action.payload);
      })
      .addCase(addListItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeListItem.fulfilled, (state, action) => {
        state.listItems = state.listItems.filter(
          (listItem) => listItem.id !== action.payload,
        );
      })
      .addCase(removeListItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(editListItem.fulfilled, (state, action) => {
        const index = state.listItems.findIndex(
          (listItem) => listItem.id === action.payload.id,
        );
        if (index !== -1) {
          state.listItems[index] = action.payload;
        }
      })
      .addCase(editListItem.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default listItemsSlice.reducer;
