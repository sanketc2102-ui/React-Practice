import "./App.css";
import TicTacToe from "./TicTacToe";

function App() {
  return (
    <>
      <TicTacToe size={3} />;
      <TicTacToe size={5} />;
    </>
  );
}

export default App;
