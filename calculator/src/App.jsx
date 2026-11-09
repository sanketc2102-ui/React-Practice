import "./App.css";
import { useReducer } from "react";
import OperationBtn from "./components/OperationBtn";
import DigitBtn from "./components/DigitBtn";

export const Action = {
  ADD_DIGIT: "add_digit",
  DELETE: "delete",
  EVALUATE: "evaluate",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose_operation",
};

const initialState = {
  currentOperand: null,
  previousOperand: null,
  operand: null,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case Action.ADD_DIGIT:
      if (state.currentOperand?.contains(".")) return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload}`,
      };
    case Action.CHOOSE_OPERATION:
      return {
        ...state,
        operand: payload,
        previousOperand: state.currentOperand,
        currentOperand: null,
      };
    case Action.EVALUATE:
      return {
        currentOperand: evaluate(state),
        previousOperand: null,
        operand: null,
      };
    case Action.CLEAR:
      return {
        initialState,
      };
  }
}

function evaluate({ currentOperand, previousOperand, operand }) {
  let pre = +previousOperand;
  let curr = +currentOperand;

  // if (!pre || !curr) return null;

  let solution = 0;

  switch (operand) {
    case "+":
      solution = pre + curr;
      break;
    case "-":
      solution = pre - curr;
      break;
    case "*":
      solution = pre * curr;
      break;
    case "/":
      solution = pre / curr;
      break;
  }

  console.log(solution);
  return solution.toString();
}

export default function App() {
  const [{ currentOperand, previousOperand, operand }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <div className="calculator">
      <div className="output">
        <div className="previous">
          {previousOperand} {operand}
        </div>
        <div className="current">{currentOperand}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: Action.CLEAR })}
      >
        AC
      </button>
      <button>DEL</button>
      <OperationBtn operation={"/"} dispatch={dispatch} />

      <DigitBtn digit={"1"} dispatch={dispatch} />
      <DigitBtn digit={"2"} dispatch={dispatch} />
      <DigitBtn digit={"3"} dispatch={dispatch} />
      <OperationBtn operation={"*"} dispatch={dispatch} />

      <DigitBtn digit={"4"} dispatch={dispatch} />
      <DigitBtn digit={"5"} dispatch={dispatch} />
      <DigitBtn digit={"6"} dispatch={dispatch} />
      <OperationBtn operation={"+"} dispatch={dispatch} />

      <DigitBtn digit={"7"} dispatch={dispatch} />
      <DigitBtn digit={"8"} dispatch={dispatch} />
      <DigitBtn digit={"9"} dispatch={dispatch} />
      <OperationBtn operation={"-"} dispatch={dispatch} />

      <DigitBtn digit={"."} dispatch={dispatch} />

      <DigitBtn digit={"0"} dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: Action.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}
