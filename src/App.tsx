import React from 'react';
import { StyledApp } from './App.styles';
import TodoList from './features/todos/TodoList';

function App() {
  return (
    <StyledApp>
      <TodoList />
    </StyledApp>
  );
}

export default App;
