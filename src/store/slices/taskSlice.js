import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getTasks,
  getTask,
  deleteTask,
  createTask,
  updateTask,
} from '@api/taskApi';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (token, { rejectWithValue }) => {
    try {
      const data = await getTasks(token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const fetchTask = createAsyncThunk(
  'tasks/fetchTask',
  async ({ token, taskId }, { rejectWithValue }) => {
    try {
      const data = await getTask(token, taskId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async ({ token, taskData }, { rejectWithValue }) => {
    try {
      const data = await createTask(token, taskData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async ({ token, taskId }, { rejectWithValue }) => {
    try {
      await deleteTask(token, taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async ({ token, taskData, taskId }, { rejectWithValue }) => {
    try {
      const data = await updateTask(token, taskData, taskId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(editTask.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
