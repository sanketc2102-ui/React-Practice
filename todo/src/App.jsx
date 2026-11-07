import CompleteTodo from "./components/CompleteTodo";
import Todo from "./components/Todo";

export default function App() {
  return (
    <div className="container">
      <CompleteTodo />
      <Todo />
    </div>
  );
}
