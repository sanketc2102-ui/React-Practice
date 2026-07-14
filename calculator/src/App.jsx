import "./App.css";
import React, { useReducer } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
  CHOOSE_OPERATIONS: "choose-operations",
  CLEAR: "clear",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }

      if (payload.digit === 0 && state.currentOperand === "0") return state;

      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATIONS:
      if (state.currentOperand == null && state.previousOperand == null)
        return state;

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }

      if (state.currentOperand == null) {
        return state;
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EVALUATE:
      return {
        ...state,
        previousOperand: null,
        overwrite: true,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, operation, previousOperand }) {
  const prev = Number.parseFloat(previousOperand);
  const curr = Number.parseFloat(currentOperand);

  console.log(prev, curr);

  if (isNaN(prev) || isNaN(curr)) return "";

  let calculation = "";
  switch (operation) {
    case "+":
      calculation = prev + curr;
      break;
    case "-":
      calculation = prev - curr;
      break;
    case "*":
      calculation = prev * curr;
      break;
    case "÷":
      calculation = prev / curr;
      break;
  }

  return calculation.toString();
}

export default function App() {
  const [{ currentOperand, operation, previousOperand }, dispatch] = useReducer(
    reducer,
    {},
  );

  return (
    <div className="calculator">
      <div className="output">
        <div className="previous-operation">
          {previousOperand} {operation}
        </div>
        <div className="current-operation">{currentOperand}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>

      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton operation={"÷"} dispatch={dispatch} />

      <DigitButton digit={1} dispatch={dispatch} />
      <DigitButton digit={2} dispatch={dispatch} />
      <DigitButton digit={3} dispatch={dispatch} />
      <OperationButton operation={"*"} dispatch={dispatch} />

      <DigitButton digit={4} dispatch={dispatch} />
      <DigitButton digit={5} dispatch={dispatch} />
      <DigitButton digit={6} dispatch={dispatch} />

      <OperationButton operation={"+"} dispatch={dispatch} />

      <DigitButton digit={7} dispatch={dispatch} />
      <DigitButton digit={8} dispatch={dispatch} />
      <DigitButton digit={9} dispatch={dispatch} />

      <OperationButton operation={"-"} dispatch={dispatch} />
      <DigitButton digit={"."} dispatch={dispatch} />
      <DigitButton digit={0} dispatch={dispatch} />

      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}
