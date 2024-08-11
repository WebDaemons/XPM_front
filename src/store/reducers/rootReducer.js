import { combineReducers } from 'redux';
import authReducer from '@slices/authSlice';
import userReducer from '@slices/userSlice';
import taskReducer from '@slices/taskSlice';
import categoryReducer from '@slices/categorySlice';
import noteReducer from '@slices/noteSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  tasks: taskReducer,
  categories: categoryReducer,
  notes: noteReducer,
});

export default rootReducer;
