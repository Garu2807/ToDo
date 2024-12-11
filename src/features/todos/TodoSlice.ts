import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';
import { TodoState } from './types/TodoState';

const getInitialState = () => {
  const State = localStorage.getItem('todosState');
  return State ? JSON.parse(State) : { todos: [] };
};
const initialState: TodoState = getInitialState();

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const id = uuidv4();
      state.todos.push({ ...action.payload, id });
      localStorage.setItem('todosState', JSON.stringify(state));
    },
    removeTodo: (state, action) => {
      const { id } = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem('todosState', JSON.stringify(state));
    },
    changeTodoStatus: (state, action) => {
      const { id, status } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.status = status;
        localStorage.setItem('todosState', JSON.stringify(state));
      }
    },
    changeTodoTitle: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id !== action.payload.id ? todo : action.payload
      );
      localStorage.setItem('todosState', JSON.stringify(state));
    },
    removeCompletedTodo: (state) => {
      state.todos = state.todos.filter((todo) => !todo.status);
      localStorage.setItem('todosState', JSON.stringify(state));
    },
  },
});

export const {
  addTodo,
  removeTodo,
  changeTodoStatus,
  changeTodoTitle,
  removeCompletedTodo,
} = todosSlice.actions;

export const selectActiveTodos = (state: RootState) =>
  state.todos.todos.filter((todo) => !todo.status);
export const selectCompletedTodos = (state: RootState) =>
  state.todos.todos.filter((todo) => todo.status);

export default todosSlice.reducer;
