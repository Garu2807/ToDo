import { configureStore } from '@reduxjs/toolkit';
import TodoReducer from './TodoSlice';
import { useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: { todos: TodoReducer },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: <T>(fn: (state: RootState) => T) => T =
  useSelector;
export default store;
