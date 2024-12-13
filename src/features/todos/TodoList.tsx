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
  Container,
  Header,
  InputContainer,
  List,
  Footer,
  Counter,
  FilterButton,
  AddTodoBtn,
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
    // if (title.trim() === '') return; // Проверка на пустое значение
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
    <Container data-testid="todo-list">
      <Header>TODOS</Header>
      <InputContainer>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Что нужно сделать?"
          onKeyDown={handleKeyDown}
        />
        <AddTodoBtn onClick={handleAddTodo}>Добавить</AddTodoBtn>
      </InputContainer>
      <List>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
      <Footer>
        <Counter>Кол-во задач: {activeTodosCount}</Counter>
        <div>
          <FilterButton
            isActive={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            Все
          </FilterButton>
          <FilterButton
            isActive={filter === 'active'}
            onClick={() => setFilter('active')}
          >
            Активные
          </FilterButton>
          <FilterButton
            isActive={filter === 'completed'}
            onClick={() => setFilter('completed')}
          >
            Завершенные
          </FilterButton>
        </div>
        <button onClick={handleRemoveCompleted}>Удалить завершенные</button>
      </Footer>
    </Container>
  );
}

export default TodoList;
