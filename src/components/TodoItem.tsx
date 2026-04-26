import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all hover:shadow-md">
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
          todo.completed
            ? "border-indigo-500 bg-indigo-500 text-white"
            : "border-gray-300 hover:border-indigo-400"
        }`}
        aria-label={todo.completed ? "未完了に戻す" : "完了にする"}
      >
        {todo.completed && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-3 w-3"
          >
            <path
              fillRule="evenodd"
              d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      <span
        className={`flex-1 transition-all ${
          todo.completed ? "text-gray-400 line-through" : "text-gray-800"
        }`}
      >
        {todo.text}
      </span>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="shrink-0 rounded-md px-2 py-1 text-sm text-gray-400 transition-all hover:bg-red-50 hover:text-red-500 active:scale-95"
        aria-label="削除"
      >
        ✕
      </button>
    </div>
  );
}
