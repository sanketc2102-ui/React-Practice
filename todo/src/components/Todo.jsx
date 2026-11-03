import { useEffect, useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState(() => {
    const rawData = localStorage.getItem("todoist");
    return rawData ? JSON.parse(rawData) : [];
  });
  const [input, setInput] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem("todoist", JSON.stringify(todos));
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

  function hanldeTodoComplete(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function deletetodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  function startEditing(todo) {
    setEditingId(todo.id);
    setEditingText(todo.title);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingText("");
  }

  function saveEditing(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editingText } : todo,
      ),
    );

    cancelEditing();
  }

  function hanldeKeyDown(e, id) {
    if (e.key === "Enter") {
      saveEditing(id);
    } else if ((e.key = "Escape")) {
      cancelEditing();
    }
  }

  return (
    <form onSubmit={hanldeSubmit}>
      <h1>machine coding todo</h1>
      <p>let's get stuff done</p>
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
              onChange={() => hanldeTodoComplete(todo.id)}
            />

            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => hanldeKeyDown(e, todo.id)}
                />
                <button type="button" onClick={() => saveEditing(editingId)}>
                  save
                </button>
                <button type="button" onClick={cancelEditing}>
                  cancel
                </button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <button type="button" onClick={() => startEditing(todo)}>
                  edit
                </button>
              </>
            )}

            <button onClick={() => deletetodo(todo.id)} type="button">
              delete
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
}
