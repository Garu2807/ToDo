import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import TodoItem from './TodoItem';
import {
  addTodo,
  removeCompletedTodo,
  selectActiveTodos,
  selectCompletedTodos,
} from './TodoSlice';
import {
  GlobalStyle,
  Container,
  Header,
  InputContainer,
  List,
  Footer,
  Counter,
  FilterButton,
  RemoveCompletedBtn,
  Arrow,
} from './Todo.styles';
import { AddTodo } from './types/Todo';

function TodoList() {
  const todos = useAppSelector((state) => state.todos.todos);
  const activeTodos = useAppSelector(selectActiveTodos);
  const completedTodos = useAppSelector(selectCompletedTodos);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') return;
    const newTodo: AddTodo = {
      title: title,
      status: false,
    };
    dispatch(addTodo(newTodo));
    setTitle('');
    setFilter('all');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo(e as unknown as React.FormEvent);
    }
  };

  const handleRemoveCompleted = () => {
    dispatch(removeCompletedTodo());
  };

  const filteredTodos =
    filter === 'all'
      ? todos
      : filter === 'active'
      ? activeTodos
      : completedTodos;
  const activeTodosCount = activeTodos.length;

  return (
    <>
      <GlobalStyle />
      <Container data-testid="todo-list">
        <Header>TODOS</Header>
        <InputContainer onSubmit={handleAddTodo}>
          <Arrow />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Что нужно сделать?"
            onKeyDown={handleKeyDown}
            data-testid="input-todo"
          />
          <button type="submit" data-testid="add-btn">
            Добавить
          </button>
        </InputContainer>
        <List>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </List>
        <Footer>
          <Counter>Кол-во задач: {activeTodosCount}</Counter>

          <FilterButton
            $isActive={filter === 'all'}
            onClick={() => setFilter('all')}
            data-active={filter === 'all' ? 'true' : 'false'}
            data-testid="all-btn"
          >
            Все
          </FilterButton>
          <FilterButton
            $isActive={filter === 'active'}
            onClick={() => setFilter('active')}
            data-active={filter === 'active' ? 'true' : 'false'}
            data-testid="active-btn"
          >
            Активные
          </FilterButton>
          <FilterButton
            $isActive={filter === 'completed'}
            onClick={() => setFilter('completed')}
            data-active={filter === 'completed' ? 'true' : 'false'}
            data-testid="completed-btn"
          >
            Завершенные
          </FilterButton>

          <RemoveCompletedBtn
            onClick={handleRemoveCompleted}
            data-testid="remove-completed-btn"
          >
            Удалить завершенные
          </RemoveCompletedBtn>
        </Footer>
      </Container>
    </>
  );
}

export default TodoList;
