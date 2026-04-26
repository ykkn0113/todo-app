import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import AddTodo from "../components/AddTodo";
import TodoItem from "../components/TodoItem";
import App from "../App";
import type { Todo } from "../types/todo";

// jsdom には crypto.randomUUID がないためモック
if (!crypto.randomUUID) {
  Object.defineProperty(globalThis, "crypto", {
    value: {
      randomUUID: () => Math.random().toString(36).slice(2),
    },
  });
}

afterEach(() => {
  cleanup();
});

// ─── AddTodo ───────────────────────────────────────────────
describe("AddTodo", () => {
  it("renders input and submit button", () => {
    render(<AddTodo onAdd={vi.fn()} />);
    expect(screen.getByPlaceholderText("タスクを入力...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();
  });

  it("calls onAdd with trimmed text and clears input", async () => {
    const onAdd = vi.fn();
    render(<AddTodo onAdd={onAdd} />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("タスクを入力..."), "Buy milk");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(onAdd).toHaveBeenCalledWith("Buy milk");
    expect(screen.getByPlaceholderText("タスクを入力...")).toHaveValue("");
  });

  it("rejects whitespace-only input", async () => {
    const onAdd = vi.fn();
    render(<AddTodo onAdd={onAdd} />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("タスクを入力..."), "   ");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it("rejects empty input", async () => {
    const onAdd = vi.fn();
    render(<AddTodo onAdd={onAdd} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(onAdd).not.toHaveBeenCalled();
  });
});

// ─── TodoItem ──────────────────────────────────────────────
describe("TodoItem", () => {
  const baseTodo: Todo = { id: "1", text: "Test task", completed: false };

  it("renders todo text", () => {
    render(
      <TodoItem todo={baseTodo} onToggle={vi.fn()} onDelete={vi.fn()} />,
    );
    expect(screen.getByText("Test task")).toBeInTheDocument();
  });

  it("calls onToggle when toggle button is clicked", async () => {
    const onToggle = vi.fn();
    render(
      <TodoItem todo={baseTodo} onToggle={onToggle} onDelete={vi.fn()} />,
    );
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "完了にする" }));
    expect(onToggle).toHaveBeenCalledWith("1");
  });

  it("calls onDelete when delete button is clicked", async () => {
    const onDelete = vi.fn();
    render(
      <TodoItem todo={baseTodo} onToggle={vi.fn()} onDelete={onDelete} />,
    );
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "削除" }));
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("applies line-through class when completed", () => {
    const doneTodo: Todo = { id: "2", text: "Done task", completed: true };
    render(
      <TodoItem todo={doneTodo} onToggle={vi.fn()} onDelete={vi.fn()} />,
    );
    expect(screen.getByText("Done task")).toHaveClass("line-through");
  });
});

// ─── App integration ───────────────────────────────────────
describe("App integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows empty state initially", () => {
    render(<App />);
    expect(
      screen.getByText("タスクがありません。上のフォームから追加してください！"),
    ).toBeInTheDocument();
  });

  it("adds a task to the list", async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("タスクを入力..."), "First task");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(screen.getByText("First task")).toBeInTheDocument();
  });

  it("toggles task completion styling", async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("タスクを入力..."), "Toggle me");
    await user.click(screen.getByRole("button", { name: "追加" }));

    const taskText = screen.getByText("Toggle me");
    expect(taskText).not.toHaveClass("line-through");

    await user.click(screen.getByRole("button", { name: "完了にする" }));
    expect(taskText).toHaveClass("line-through");
  });

  it("deletes a task from the list", async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("タスクを入力..."), "Keep me");
    await user.click(screen.getByRole("button", { name: "追加" }));

    await user.type(screen.getByPlaceholderText("タスクを入力..."), "Delete me");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(screen.getByText("Keep me")).toBeInTheDocument();
    expect(screen.getByText("Delete me")).toBeInTheDocument();

    // delete the second task — find the delete button within its row
    const deleteButtons = screen.getAllByRole("button", { name: "削除" });
    await user.click(deleteButtons[1]);

    expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
    expect(screen.getByText("Keep me")).toBeInTheDocument();
  });
});
