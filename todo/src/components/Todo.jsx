import { useEffect, useState } from "react";

export default function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    const rawData = localStorage.getItem("todo-ist");
    const todo = JSON.parse(rawData);
    return todo || [];
  });

  const [editingText, setEditingTex] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(
    function () {
      localStorage.setItem("todo-ist", JSON.stringify(todos));
    },
    [todos],
  );

  function hanldeAddTodo(e) {
    e.preventDefault();

    const newTodo = {
      id: crypto.randomUUID(),
      title: input,
      done: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
    setInput("");
  }

  function hanldeDeleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  function handleToggleTodo(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function startEdit(todo) {
    setEditingTex(todo.title);
    setEditingId(todo.id);
  }

  function cancelEditing() {
    setEditingTex("");
    setEditingId(null);
  }

  function saveEdit(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editingText } : todo,
      ),
    );

    cancelEditing();
  }

  function onHitEsc(e, id) {
    if (e.kay === "Enter") {
      saveEdit(id);
    } else if (e.kay === "Escape") {
      cancelEditing();
    }
  }

  return (
    <>
      <h2>what's have in your mind today?</h2>
      <form onSubmit={hanldeAddTodo}>
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
                onChange={() => handleToggleTodo(todo.id)}
              />

              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingTex(e.target.value)}
                    onKeyDown={(e) => onHitEsc(e, todo.id)}
                  />
                  <button type="button" onClick={() => saveEdit(todo.id)}>
                    save
                  </button>
                  <button type="button" onClick={cancelEditing}>
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

              <button type="button" onClick={() => hanldeDeleteTodo(todo.id)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}
