import { combineReducers } from 'redux';
import authReducer from '@store/slices//authSlice';
import userReducer from '@store/slices//userSlice';
import taskReducer from '@store/slices//taskSlice';
import categoryReducer from '@store/slices//categorySlice';
import noteReducer from '@features/notes/slices/noteSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  tasks: taskReducer,
  categories: categoryReducer,
  notes: noteReducer,
});

export default rootReducer;
