import { useState } from "react";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed === "") return;
    onAdd(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
        placeholder="タスクを入力..."
        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
      />
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md active:scale-95"
      >
        追加
      </button>
    </form>
  );
}
