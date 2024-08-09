import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.findIndex(
        (category) => category.id === action.payload.id,
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteCategory: (state, action) => {
      return state.filter((category) => category.id !== action.payload);
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
