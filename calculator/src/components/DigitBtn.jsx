import { Actions } from "../App";

export default function DigitBtn({ digit, dispatch }) {
  return (
    <button onClick={() => dispatch({ type: Actions.add, payload: digit })}>
      {digit}
    </button>
  );
}
