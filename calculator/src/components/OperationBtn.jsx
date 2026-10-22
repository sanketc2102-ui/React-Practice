import { Actions } from "../App";

export default function OperationBtn({ operation, dispatch }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: Actions.choose_operation, payload: operation })
      }
    >
      {operation}
    </button>
  );
}
