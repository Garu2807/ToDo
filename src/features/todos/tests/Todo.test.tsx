import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store'; // ваш существующий store
import TodoList from '../TodoList';
import TodoItem from '../TodoItem';
import { Todo } from '../types/Todo';

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
  test('Проверяем что кнопка "Все" отображается и работает', () => {
    renderTodoList();
    expect(screen.getByTestId('all-btn')).toBeInTheDocument();
    const allButton = screen.getByTestId('all-btn');
    fireEvent.click(allButton);
    // Проверка, что фильтр изменился на "all"
    expect(allButton).toHaveAttribute('data-active', 'true');
  });

  test('Проверяем что кнопка "Активные" отображается и работает', () => {
    renderTodoList();
    expect(screen.getByTestId('active-btn')).toBeInTheDocument();
    const activeButton = screen.getByTestId('active-btn');
    fireEvent.click(activeButton);
    // Проверка, что фильтр изменился на "active"
    expect(activeButton).toHaveAttribute('data-active', 'true');
  });

  test('Проверяем что кнопка "Завершенные" отображается и работает', () => {
    renderTodoList();
    expect(screen.getByTestId('completed-btn')).toBeInTheDocument();
    const completedButton = screen.getByTestId('completed-btn');
    fireEvent.click(completedButton);
    // Проверка, что фильтр изменился на "completed"
    expect(completedButton).toHaveAttribute('data-active', 'true');
  });
  test('Проверяем, что нажатие Enter вызывает handleAddTodo', () => {
    renderTodoList();
    const input = screen.getByTestId('input-todo');
    fireEvent.change(input, { target: { value: 'Новое дело' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    const todoItems = screen.getAllByText(/новое дело/i);
    expect(todoItems.length).toBeGreaterThan(0);
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
