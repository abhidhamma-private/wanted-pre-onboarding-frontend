import { ChangeEvent, useState } from "react";
import { deleteTodo, updateTodo } from "../service/api";
import { Todo, UpdateTodoRequest } from "../service/type";

interface TodoItemProperty {
  todo: Todo;
  refetchTodos: any;
}
export const TodoItem = ({ todo, refetchTodos }: TodoItemProperty) => {
  const [isEditable, setIsisEditable] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(todo.isCompleted);
  const [todoText, setTodoText] = useState<string>(todo.todo);

  const onUpdateTodo = async (
    id: number,
    updateTodoRequest: UpdateTodoRequest
  ) => {
    await updateTodo(id, updateTodoRequest);
    setIsisEditable(false);
    refetchTodos();
  };
  const onDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    refetchTodos();
  };

  return (
    <li>
      <label>
        <input
          type='checkbox'
          defaultChecked={isCompleted}
          onClick={() => setIsCompleted((prev) => !prev)}
        />
        {isEditable ? (
          <input
            data-testid='modify-input'
            value={todoText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTodoText(e.target.value)
            }
          />
        ) : (
          <span>{todo.todo}</span>
        )}
      </label>
      {isEditable ? (
        <button
          data-testid='submit-button'
          onClick={() =>
            onUpdateTodo(todo.id, { isCompleted: isCompleted, todo: todoText })
          }
        >
          제출
        </button>
      ) : (
        <button
          data-testid='modify-button'
          onClick={() => setIsisEditable(true)}
        >
          수정
        </button>
      )}

      <button data-testid='delete-button' onClick={() => onDeleteTodo(todo.id)}>
        삭제
      </button>
    </li>
  );
};
