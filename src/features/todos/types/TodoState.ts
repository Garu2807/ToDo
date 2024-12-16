import { Todo } from './Todo';

export type TodoState = {
  todos: Todo[];
  error?: string | undefined;
};
