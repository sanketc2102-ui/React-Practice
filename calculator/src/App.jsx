import { useReducer } from "react";
import "./App.css";
import DigitBtn from "./components/DigitBtn";
import OperationBtn from "./components/OperationBtn";

export const Actions = {
  add: "ADD",
  delete: "DELETE",
  evaluate: "EVALUATE",
  clear: "CLEAR",
  choose_operation: "CHOOSE-OPERATION",
};

const initialState = {
  previousOperand: null,
  currentOperand: null,
  operation: null,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case Actions.add:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload}`,
      };
    case Actions.clear:
      return initialState;
    case Actions.delete:
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case Actions.choose_operation:
      return {
        ...state,
        previousOperand: state.currentOperand,
        operation: payload,
        currentOperand: null,
      };
    case Actions.evaluate:
      return {
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  let prev = +previousOperand;
  let curr = +currentOperand;

  if (isNaN(prev) || isNaN(curr)) {
    return null;
  }

  let evaluation = 0;

  switch (operation) {
    case "+":
      evaluation = prev + curr;
      break;
    case "-":
      evaluation = prev - curr;
      break;
    case "*":
      evaluation = prev * curr;
      break;
    case "/":
      evaluation = prev / curr;
      break;
  }

  return evaluation.toString();
}

export default function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <div className="calculator">
      <div className="output">
        <div className="previous">
          {previousOperand} {operation}
        </div>
        <div className="current">{currentOperand}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: Actions.clear })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: Actions.delete })}>DEL</button>
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
        onClick={() => dispatch({ type: Actions.evaluate })}
      >
        =
      </button>
    </div>
  );
}
