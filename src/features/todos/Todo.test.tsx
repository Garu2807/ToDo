import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store';
import TodoList from './TodoList';
import TodoItem from './TodoItem';
import { Todo } from './types/Todo';

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

  test('Добавление нового дела и очистка поля ввода', () => {
    renderTodoList();

    const input = screen.getByPlaceholderText(/что нужно сделать/i);
    fireEvent.change(input, {
      target: { value: 'Новое дело' },
    });

    fireEvent.click(screen.getByRole('button', { name: /добавить/i }));

    expect(screen.getByText(/новое дело/i)).toBeInTheDocument();

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
describe('Component TodoItem', () => {
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

    // Проверяем, что компонент TodoList рендерится
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
