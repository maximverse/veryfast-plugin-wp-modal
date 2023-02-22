// src/features/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import checkoutReducer from './checkoutSlice';
export default combineReducers({
  checkout: checkoutReducer,
});
