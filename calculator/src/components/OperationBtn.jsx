import { Action } from "../App";

export default function OperationBtn({ operation, dispatch }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: Action.CHOOSE_OPERATION, payload: operation })
      }
    >
      {operation}
    </button>
  );
}
