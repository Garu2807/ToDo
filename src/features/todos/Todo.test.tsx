import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store';
import TodoList from './TodoList';

const renderTodoList = () => {
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

describe('TodoList Component', () => {
  test('Компонент TodoList рендерится', () => {
    renderTodoList();

    // Проверяем, что компонент TodoList рендерится
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });

  test('Проверяем, что заголовок отображается', () => {
    renderTodoList();

    // Проверяем, что заголовок отображается
    expect(screen.getByText(/todos/i)).toBeInTheDocument();
  });

  test('Проверяем, что кнопка "Добавить" отображается', () => {
    renderTodoList();

    // Проверяем, что кнопка "Добавить" отображается
    expect(
      screen.getByRole('button', { name: /добавить/i })
    ).toBeInTheDocument();
  });

  test('Добавление нового дела и очистка поля ввода', () => {
    renderTodoList();

    // Вводим текст в поле ввода
    const input = screen.getByPlaceholderText(/что нужно сделать/i);
    fireEvent.change(input, {
      target: { value: 'Новое дело' },
    });

    // Нажимаем кнопку "Добавить"
    fireEvent.click(screen.getByRole('button', { name: /добавить/i }));

    // Проверяем, что новое дело добавлено в список
    expect(screen.getByText(/новое дело/i)).toBeInTheDocument();

    // Проверяем, что поле ввода очищено
    expect(input).toHaveValue('');
  });

  // test('Нельзя добавить дело с пустым заголовком', () => {
  //   renderTodoList();

  //   // Получаем количество элементов в списке до добавления
  //   const initialTodoCount = screen.queryAllByRole('listitem').length;

  //   // Вводим пустое значение в поле ввода
  //   const input = screen.getByPlaceholderText(/что нужно сделать/i);
  //   fireEvent.change(input, {
  //     target: { value: '' },
  //   });

  //   // Нажимаем кнопку "Добавить"
  //   fireEvent.click(screen.getByRole('button', { name: /добавить/i }));

  //   // Проверяем, что количество элементов в списке не изменилось
  //   const finalTodoCount = screen.queryAllByRole('listitem').length;
  //   expect(finalTodoCount).toBe(initialTodoCount);

  //   // Проверяем, что поле ввода остается пустым
  //   expect(input).toHaveValue('');
  // });
});
