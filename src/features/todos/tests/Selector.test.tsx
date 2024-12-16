// @ts-ignore
import React from 'react';
import '@testing-library/jest-dom';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import todosReducer, {
  addTodo,
  selectTodos,
  selectActiveTodos,
  selectCompletedTodos,
} from '../TodoSlice';
import { RootState } from '../store';

let uuidCounter = 0;
jest.mock('uuid', () => ({
  v4: jest.fn(() => `uuid-${uuidCounter++}`),
}));

describe('Тестирование селекторов', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        todos: todosReducer,
      },
    });
    uuidCounter = 0;
  });

  test('selectTodos возвращает все  дела', () => {
    store.dispatch(addTodo({ title: 'Дело 1', status: false }));
    store.dispatch(addTodo({ title: 'Дело 2', status: true }));
    store.dispatch(addTodo({ title: 'Дело 3', status: false }));

    const state: RootState = store.getState();
    const todos = selectTodos(state);

    expect(todos).toHaveLength(3);
    expect(todos[0].title).toBe('Дело 1');
    expect(todos[1].title).toBe('Дело 2');
    expect(todos[2].title).toBe('Дело 3');
  });

  test('selectActiveTodos возвращает только активные дела', () => {
    store.dispatch(addTodo({ title: 'Дело 1', status: false }));
    store.dispatch(addTodo({ title: 'Дело 2', status: true }));
    store.dispatch(addTodo({ title: 'Дело 3', status: false }));

    const state: RootState = store.getState();
    const activeTodos = selectActiveTodos(state);

    expect(activeTodos).toHaveLength(2);
    expect(activeTodos[0].title).toBe('Дело 1');
    expect(activeTodos[1].title).toBe('Дело 3');
  });

  test('selectCompletedTodos возвращает только завершённые дела', () => {
    store.dispatch(addTodo({ title: 'Дело 1', status: false }));
    store.dispatch(addTodo({ title: 'Дело 2', status: true }));
    store.dispatch(addTodo({ title: 'Дело 3', status: true }));

    const state: RootState = store.getState();
    const completedTodos = selectCompletedTodos(state);

    expect(completedTodos).toHaveLength(2);
    expect(completedTodos[0].title).toBe('Дело 2');
    expect(completedTodos[1].title).toBe('Дело 3');
  });
});
