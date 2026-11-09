import { Action } from "../App";

export default function DigitBtn({ digit, dispatch }) {
  return (
    <button
      onClick={() => dispatch({ type: Action.ADD_DIGIT, payload: digit })}
    >
      {digit}
    </button>
  );
}
