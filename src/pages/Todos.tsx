import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo, getTodos } from "../service/api";
import { ACCESS_TOKEN } from "../service/constant";
import { Todo } from "../service/type";
import { TodoItem } from "./TodoItem";

export const Todos = () => {
  const [createTodoInput, setCreateTodoInput] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>();
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token == null) {
      navigate("/signin");
    }
  }, []);

  const refetchTodos = () =>
    getTodos().then((response) => setTodos(response.data));
  useEffect(() => {
    refetchTodos();
  }, []);
  const onCreateTodo = async (createTodoInput: string) => {
    await createTodo({ todo: createTodoInput });
    getTodos().then((response) => setTodos(response.data));
  };

  return (
    <>
      <input
        data-testid='new-todo-input'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCreateTodoInput(e.target.value)
        }
      />
      <button
        data-testid='new-todo-add-button'
        onClick={() => onCreateTodo(createTodoInput)}
      >
        추가
      </button>
      {todos?.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} refetchTodos={refetchTodos} />
      ))}
    </>
  );
};
