import { useEffect } from "react";
import { useState } from "react";

export default function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    const rawData = localStorage.getItem("todo-ist");
    const todos = JSON.parse(rawData);
    return todos || [];
  });
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(
    function () {
      localStorage.setItem("todo-ist", JSON.stringify(todos));
    },
    [todos],
  );

  function hanldeCheckBox(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function hanldeTodoAdd(e) {
    e.preventDefault();

    const newTodo = {
      id: crypto.randomUUID(),
      title: input,
      done: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
    setInput("");
  }

  function handleDeleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  function startEdit(todo) {
    setEditingId(todo.id);
    setEditingText(todo.title);
  }

  function cancelEdting() {
    setEditingId(null);
    setEditingText("");
  }

  function saveEdit(editTodo) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === editTodo.id ? { ...todo, title: editingText } : todo,
      ),
    );

    cancelEdting();
  }

  return (
    <form onSubmit={hanldeTodoAdd}>
      <h1>what's in your mind, today?</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => hanldeCheckBox(todo.id)}
            />
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button type="button" onClick={() => saveEdit(todo)}>
                  save
                </button>
                <button type="button" onClick={cancelEdting}>
                  cancel
                </button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <button type="button" onClick={() => startEdit(todo)}>
                  edit
                </button>
              </>
            )}

            <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
}
