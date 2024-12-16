// @ts-ignore
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import todosReducer, {
  removeTodo,
  changeTodoStatus,
  changeTodoTitle,
} from '../TodoSlice';
import TodoItem from '../TodoItem';
import { Todo } from '../types/Todo';
import { useAppDispatch } from '../store';
import { Dispatch } from 'redux';

// Мокаем useAppDispatch
jest.mock('../store', () => ({
  ...jest.requireActual('../store'),
  useAppDispatch: jest.fn(),
}));

describe('Тестирование Dispatch', () => {
  let store: EnhancedStore;
  let dispatchMock: Dispatch;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        todos: todosReducer,
      },
    });

    dispatchMock = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  const renderTodoItem = (todo: Todo) => {
    render(
      <Provider store={store}>
        <TodoItem todo={todo} />
      </Provider>
    );
  };

  test('Проверяем, что все действия вызывают dispatch с правильными параметрами', () => {
    const todo = { id: '1', title: 'Тестовое дело', status: false };
    renderTodoItem(todo);

    // Проверка удаления
    const removeButton = screen.getByTestId('remove-btn');
    fireEvent.click(removeButton);
    expect(dispatchMock).toHaveBeenCalledWith(removeTodo({ id: todo.id }));

    // Проверка изменения статуса
    const statusCheckbox = screen.getByTestId('input-checkbox');
    fireEvent.click(statusCheckbox);
    expect(dispatchMock).toHaveBeenCalledWith(
      changeTodoStatus({ id: todo.id, status: true })
    );

    // Проверка изменения заголовка
    const editButton = screen.getByText('Тестовое дело');
    fireEvent.click(editButton);
    const titleInput = screen.getByTestId('title-input');
    fireEvent.change(titleInput, { target: { value: 'Обновленное дело' } });
    fireEvent.blur(titleInput);
    expect(dispatchMock).toHaveBeenCalledWith(
      changeTodoTitle({
        id: todo.id,
        title: 'Обновленное дело',
        status: todo.status,
      })
    );
  });
});
