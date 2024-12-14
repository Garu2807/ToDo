import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store'; // ваш существующий store
import TodoList from '../TodoList';
import TodoItem from '../TodoItem';
import { Todo } from '../types/Todo';

import { configureStore } from '@reduxjs/toolkit';
import todosReducer, {
  addTodo,
  changeTodoStatus,
  changeTodoTitle,
  getInitialState,
} from '../TodoSlice';
import { TodoState } from '../types/TodoState';

// Хелперы для рендера
const renderTodoList = () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

const renderTodoItem = (todo: Todo) => {
  render(
    <Provider store={store}>
      <TodoItem todo={todo} />
    </Provider>
  );
};

const addTodoUI = (todoText: string) => {
  renderTodoList();
  const input = screen.getByPlaceholderText(/что нужно сделать/i);
  fireEvent.change(input, {
    target: { value: todoText },
  });
  fireEvent.click(screen.getByRole('button', { name: /добавить/i }));
  return input;
};

describe('Компонент TodoList', () => {
  test('Компонент TodoList рендерится', () => {
    renderTodoList();
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });

  test('Проверяем, что заголовок отображается', () => {
    renderTodoList();
    expect(screen.getByText(/todos/i)).toBeInTheDocument();
  });

  test('Проверяем, что кнопка "Добавить" отображается', () => {
    renderTodoList();
    expect(screen.getByTestId('add-btn')).toBeInTheDocument();
  });

  test('Проверяем, что поле ввода отображается', () => {
    renderTodoList();
    expect(screen.getByTestId('input-todo')).toBeInTheDocument();
  });

  test('Input работает', () => {
    addTodoUI('Новое дело');
    expect(screen.getByText(/новое дело/i)).toBeInTheDocument();
  });

  test('Input очищяется', () => {
    const input = addTodoUI('Новое дело');
    expect(input).toHaveValue('');
  });
});

describe('Компонент TodoItem', () => {
  let todo: Todo;
  beforeEach(() => {
    todo = {
      id: '1',
      title: 'Тестовое дело',
      status: false,
    };
  });

  test('Компонент TodoItem рендерится', () => {
    renderTodoItem(todo);
    expect(screen.getByTestId('todo-item')).toBeInTheDocument();
  });
  test('Проверяем, что чекбокс отображается', () => {
    renderTodoItem(todo);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
  test('Проверяем, что кнопка "Удалить" отображается', () => {
    renderTodoItem(todo);
    expect(screen.getByTestId('remove-btn')).toBeInTheDocument();
  });
});

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1234'),
}));

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

describe('Тестирование Redux', () => {
  let initialState: TodoState = getInitialState();

  const testStore = configureStore({
    reducer: {
      todos: todosReducer,
    },
    preloadedState: {
      todos: initialState,
    },
  });

  beforeEach(() => {
    localStorage.clear();
  });

  test('getInitialState возвращает корректное начальное состояние', () => {
    const initialState = {
      todos: [{ id: '1', title: 'Сохраненное дело', status: false }],
    };
    localStorage.setItem('todosState', JSON.stringify(initialState));
    const state = getInitialState();
    expect(state).toEqual(initialState);
  });

  test('addTodo добавляет новое дело', () => {
    testStore.dispatch(addTodo({ title: 'Новое дело', status: false }));
    const state = testStore.getState().todos;
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].title).toBe('Новое дело');
    const savedState = JSON.parse(localStorage.getItem('todosState') as string);
    expect(savedState.todos[0].title).toBe('Новое дело');
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
});
