import { useEffect, useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState(() => {
    const rawData = localStorage.getItem("my-todos");
    const sotredTodos = JSON.parse(rawData);

    return sotredTodos || [];
  });
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("my-todos", JSON.stringify(todos));
  }, [todos]);

  function hanldeSubmit(e) {
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

  function hanldeCompleteTodo(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  // edit todo
  function startEditing(todo) {
    setEditText(todo.title);
    setEditingId(todo.id);
  }

  function cancelEditing() {
    setEditText("");
    setEditingId(null);
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

  function hanldeKeyDown(e, id) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit(id);
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  }

  return (
    <>
      <form onSubmit={hanldeSubmit}>
        <h1>what needs to be done?</h1>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <ul></ul>
      </form>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => hanldeCompleteTodo(todo.id)}
              onKeyDown={(e) => hanldeKeyDown(e, todo.id)}
            />

            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>save</button>
                <button>cancel</button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <button onClick={() => startEditing(todo)}>edit</button>
              </>
            )}

            <button onClick={() => handleDeleteTodo(todo.id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
