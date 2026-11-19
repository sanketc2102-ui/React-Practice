import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Todo2() {
  const [input, setInput] = useState();
  const [todos, setTodos] = useState(function () {
    const rawData = localStorage.getItem("todo-ist");
    const sotredTodos = JSON.parse(rawData);
    return sotredTodos || [];
  });

  useEffect(
    function () {
      localStorage.setItem("todo-ist", JSON.stringify(todos));
    },
    [todos],
  );

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

  function hanldeDelete(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  function hanldeCheckBox(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  return (
    <form onSubmit={hanldeTodoAdd}>
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
            <span>{todo.title}</span>
            <button type="button">edit</button>
            <button type="button" onClick={() => hanldeDelete(todo.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
}
