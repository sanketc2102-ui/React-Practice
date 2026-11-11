import React from "react";
import { Actions } from "../App";

export default function DigitBtn({ digit, dispatch }) {
  return (
    <button
      onClick={() => dispatch({ type: Actions.ADD_DIGIT, payload: digit })}
    >
      {digit}
    </button>
  );
}
