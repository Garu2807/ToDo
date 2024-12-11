export type Todo = {
  id: string;
  title: string;
  status: boolean;
};
export type TodoPropsType = {
  todo: Todo;
};
export type AddTodo = Omit<Todo, 'id'>;
