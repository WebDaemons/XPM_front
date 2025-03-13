import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from '@features/todolist/api/categoryApi';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (token, { rejectedWithValue }) => {
    try {
      const data = await getCategories(token);
      return data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  },
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async ({ token, categoryData }, { rejectedWithValue }) => {
    try {
      const data = await createCategory(token, categoryData);
      return data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  },
);

export const removeCategory = createAsyncThunk(
  'categories/removeCategory',
  async ({ token, categoryId }, { rejectedWithValue }) => {
    try {
      await deleteCategory(token, categoryId);
      return categoryId;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  },
);

export const editCategory = createAsyncThunk(
  'categories/editCategory',
  async ({ token, categoryId, categoryData }, { rejectedWithValue }) => {
    try {
      const data = await updateCategory(token, categoryData, categoryId);
      return data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  },
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload,
        );
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (category) => category.id === action.payload.id,
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
