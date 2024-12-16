// @ts-ignore
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux'; // ваш существующий store
import TodoList from '../TodoList';

import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import todosReducer, {
  addTodo,
  changeTodoStatus,
  changeTodoTitle,
  getInitialState,
  removeCompletedTodo,
  removeTodo,
} from '../TodoSlice';
import { TodoState } from '../types/TodoState';

let uuidCounter = 0;
jest.mock('uuid', () => ({
  v4: jest.fn(() => `uuid-${uuidCounter++}`),
}));

// Мокаем localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Тестирование Экшенов', () => {
  let initialState: TodoState;

  let testStore: EnhancedStore;

  beforeEach(() => {
    localStorage.clear();
    uuidCounter = 0; // Сбрасываем счетчик перед каждым тестом
    initialState = getInitialState();
    testStore = configureStore({
      reducer: {
        todos: todosReducer,
      },
      preloadedState: {
        todos: initialState,
      },
    });
  });

  test('getInitialState возвращает корректное начальное состояние', () => {
    // Устанавливаем начальное состояние в localStorage
    const initialState = {
      todos: [{ id: '1', title: 'Сохраненное дело', status: false }],
    };
    localStorage.setItem('todosState', JSON.stringify(initialState));
    const state = getInitialState();
    expect(state).toEqual(initialState);
  });
  test('нельзя добавить пустое дело', () => {
    render(
      <Provider store={testStore}>
        <TodoList />
      </Provider>
    );

    const input = screen.getByTestId('input-todo');
    const addButton = screen.getByTestId('add-btn');

    // Попытка добавить пустое дело
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(addButton);

    // Проверка, что дело не добавлен
    const state = testStore.getState().todos;
    expect(state.todos).toHaveLength(0);
  });
  test('addTodo добавляет новое дело', () => {
    testStore.dispatch(addTodo({ title: 'Новое дело', status: false }));
    const state = testStore.getState().todos;
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].title).toBe('Новое дело');
    const savedState = JSON.parse(localStorage.getItem('todosState') as string);
    expect(savedState.todos[0].title).toBe('Новое дело');
  });

  test('removeTodo удаляет дело по id', () => {
    testStore.dispatch(addTodo({ title: 'Дело 1', status: false }));
    testStore.dispatch(addTodo({ title: 'Дело 2', status: false }));
    const stateBefore = testStore.getState().todos;
    const idToRemove = stateBefore.todos[0].id;
    testStore.dispatch(removeTodo({ id: idToRemove }));
    const stateAfter = testStore.getState().todos;
    expect(stateAfter.todos).toHaveLength(1);
    expect(stateAfter.todos[0].title).toBe('Дело 2');
    const savedState = JSON.parse(localStorage.getItem('todosState') as string);
    expect(savedState.todos).toHaveLength(1);
    expect(savedState.todos[0].title).toBe('Дело 2');
  });

  test('changeTodoStatus меняет статус дела', () => {
    testStore.dispatch(addTodo({ title: 'Дело 1', status: false }));
    const idToChange = testStore.getState().todos.todos[0].id;
    testStore.dispatch(changeTodoStatus({ id: idToChange, status: true }));
    const stateAfter = testStore.getState().todos;
    expect(stateAfter.todos[0].status).toBe(true);
    const savedState = JSON.parse(localStorage.getItem('todosState') as string);
    expect(savedState.todos[0].status).toBe(true);
  });

  test('changeTodoTitle меняет заголовок дела', () => {
    testStore.dispatch(addTodo({ title: 'Старый заголовок', status: false }));
    const idToChange = testStore.getState().todos.todos[0].id;
    testStore.dispatch(
      changeTodoTitle({
        id: idToChange,
        title: 'Новый заголовок',
        status: false,
      })
    );
    const stateAfter = testStore.getState().todos;
    expect(stateAfter.todos[0].title).toBe('Новый заголовок');
    const savedState = JSON.parse(localStorage.getItem('todosState') as string);
    expect(savedState.todos[0].title).toBe('Новый заголовок');
  });

  test('removeCompletedTodo удаляет все завершённые дела', () => {
    testStore.dispatch(addTodo({ title: 'Дело 1', status: true }));
    testStore.dispatch(addTodo({ title: 'Дело 2', status: false }));
    testStore.dispatch(addTodo({ title: 'Дело 3', status: true }));
    testStore.dispatch(removeCompletedTodo());
    const stateAfter = testStore.getState().todos;
    expect(stateAfter.todos).toHaveLength(1);
    expect(stateAfter.todos[0].title).toBe('Дело 2');
    const savedState = JSON.parse(localStorage.getItem('todosState') as string);
    expect(savedState.todos).toHaveLength(1);
    expect(savedState.todos[0].title).toBe('Дело 2');
  });
});
