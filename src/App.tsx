import type { Todo } from "./types/todo";
import { useLocalStorage } from "./hooks/useLocalStorage";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const handleAdd = (text: string) => {
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 py-6 text-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          ToDo App
        </h1>
      </header>
      <main className="mx-auto max-w-xl p-4 pt-8">
        <AddTodo onAdd={handleAdd} />
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}
