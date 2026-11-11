import "./App.css";
import OperationBtn from "./components/OperationBtn";
import DigitBtn from "./components/DigitBtn";
import { useReducer } from "react";

export const Actions = {
  ADD_DIGIT: "add_digit",
  DELETE: "delete",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose_operation",
  EVALUATE: "evaluate",
};

const initialState = {
  currentOperand: null,
  preiousOperand: null,
  operation: null,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case Actions.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload}`,
      };
    case Actions.CHOOSE_OPERATION:
      return {
        ...state,
        preiousOperand: state.currentOperand,
        operation: payload,
        currentOperand: null,
      };
    case Actions.EVALUATE:
      return {
        ...state,
        currentOperand: evaluate(state),
        preiousOperand: null,
        operation: null,
      };

    case Actions.CLEAR:
      return initialState;
  }
}

function evaluate({ currentOperand, preiousOperand, operation }) {
  const pev = +preiousOperand;
  const curr = +currentOperand;

  console.log(pev, curr);

  // if (!isNaN(pev) || !isNaN(curr)) return null;

  let result = 0;

  switch (operation) {
    case "+":
      result = pev + curr;
      break;
    case "-":
      result = pev - curr;
      break;
    case "*":
      result = pev * curr;
      break;
    case "/":
      result = pev / curr;
      break;
  }

  return result.toString();
}

export default function App() {
  const [{ currentOperand, preiousOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <div className="calculator">
      <div className="output">
        <div className="previous">
          {preiousOperand} {operation}
        </div>
        <div className="current">{currentOperand}</div>
      </div>

      <button
        className="span-two"
        onClick={() => dispatch({ type: Actions.CLEAR })}
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
        onClick={() => dispatch({ type: Actions.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}
