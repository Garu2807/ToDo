import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store';
import TodoList from './TodoList';

test('Компонент TodoList рендерится', () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  // Проверяем, что компонент TodoList рендерится
  expect(screen.getByTestId('todo-list')).toBeInTheDocument();
});

test('Проверяем, что заголовок отображается', () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  // Проверяем, что заголовок отображается
  expect(screen.getByText(/todos/i)).toBeInTheDocument();
});

test('Проверяем, что кнопка "Добавить" отображается', () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  // Проверяем, что кнопка "Добавить" отображается
  expect(screen.getByText(/добавить/i)).toBeInTheDocument();
});

test('Добавление нового дела и очистка поля ввода', () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  // Вводим текст в поле ввода
  const input = screen.getByPlaceholderText(/что нужно сделать/i);
  fireEvent.change(input, {
    target: { value: 'Новое дело' },
  });

  // Нажимаем кнопку "Добавить"
  fireEvent.click(screen.getByText(/добавить/i));

  // Проверяем, что новое дело добавлено в список
  expect(screen.getByText(/новое дело/i)).toBeInTheDocument();

  // Проверяем, что поле ввода очищено
  expect(input).toHaveValue('');
});

test('Нельзя добавить пустое значение', () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  // Получаем количество элементов в списке до добавления
  const initialTodoCount = screen.getAllByRole('listitem').length;

  // Вводим пустое значение в поле ввода
  const input = screen.getByPlaceholderText(/что нужно сделать/i);
  fireEvent.change(input, {
    target: { value: '' },
  });

  // Нажимаем кнопку "Добавить"
  fireEvent.click(screen.getByText(/добавить/i));

  // Проверяем, что количество элементов в списке не изменилось
  const finalTodoCount = screen.getAllByRole('listitem').length;
  expect(finalTodoCount).toBe(initialTodoCount);
});
