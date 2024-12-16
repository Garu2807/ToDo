import React, { useState } from 'react';
import { TodoPropsType } from './types/Todo';
import { useAppDispatch } from './store';
import { changeTodoStatus, changeTodoTitle, removeTodo } from './TodoSlice';
import { DeleteButton, Item } from './Todo.styles';
import { RxCrossCircled } from 'react-icons/rx';

function TodoItem({ todo }: TodoPropsType) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleRemove = (id: string) => {
    dispatch(removeTodo({ id }));
  };

  const handleStatusChange = () => {
    dispatch(changeTodoStatus({ id: todo.id, status: !todo.status }));
  };

  const handleTitleChange = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTodo = {
      id: todo.id,
      title: title,
      status: todo.status,
    };
    dispatch(changeTodoTitle(updatedTodo));
    setIsEditing(false);
  };

  return (

    <Item $completed={todo.status} data-testid="todo-item">

      <input
        type="checkbox"
        checked={todo.status}
        onChange={handleStatusChange}
        data-testid="input-checkbox"
      />
      {isEditing ? (
        <form onSubmit={handleTitleChange}>
          <input
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleChange}
            autoFocus
            data-testid="title-input"
          />
        </form>
      ) : (
        <p onClick={() => setIsEditing(true)}>{todo.title}</p>
      )}
      <DeleteButton
        onClick={() => handleRemove(todo.id)}
        data-testid="remove-btn"
      ></DeleteButton>
    </Item>
  );
}

export default TodoItem;
