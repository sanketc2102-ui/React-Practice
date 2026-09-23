import { useEffect } from "react";
import { useState } from "react";

export default function CompleteTodo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    const rawData = localStorage.getItem("todos");
    const storedTodos = JSON.parse(rawData);

    return storedTodos || [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleTodoComplete(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
      ),
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: input,
      isComplete: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
    setInput("");
  }

  function handleDelete(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  /* It's all about editing */
  function startEditing(todo) {
    setEditingId(todo.id);
    setEditText(todo.title);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditText("");
  }

  function saveEdit(id) {
    const trimmed = editText.trim();
    if (!trimmed) {
      cancelEditing();
      return;
    }

    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: trimmed } : todo,
      ),
    );
    cancelEditing();
  }

  function handleEditKeyDown(e, id) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit(id);
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  }

  return (
    <form className="app" onSubmit={handleSubmit}>
      <h1>Complete Implimentation</h1>
      <p>what need to be done?</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo?.isComplete}
                onChange={() => handleTodoComplete(todo.id)}
              />

              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    autoFocus
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, todo.id)}
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
                  <label>{todo.title}</label>
                  <button type="button" onClick={() => startEditing(todo)}>
                    edit
                  </button>
                </>
              )}

              <button type="button" onClick={() => handleDelete(todo.id)}>
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
