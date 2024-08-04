import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;