import Digits from "./Digits"
import React, { useReducer } from 'react';
import Operation from "./Operation";
// import { c } from "tar";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  REMOVE_DIGIT: 'remove-digit',
  CLEAR: 'clear',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'

}

function App() {
  function reducer(state, { type, payload }) {
    // console.log(type, payload)
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if (payload.digit === "0" && state.currentOperand === "0") { return state }
        // if (payload.digit === "." && state.currentOperand !== "" && state.currentOperand.includes(".")) {
        //   console.log("afa" + (state.currentOperand)); return state
        // }

        // else if (payload.digit === "." && state.currentOperand.includes(".")) { return state }
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`
        }
        break;

      case ACTIONS.CHOOSE_OPERATION:
        if (payload.digit === "AC") {
          return {}
        }
        else if (payload.digit === "=") {
          return {
            ...state,
            previousOperand: evaluate(state),
            currentOperand: null,
            operation: null
          }
        }
        else {
          console.log("previous Operand " + state.previousOperand)
          console.log("current Operand " + state.currentOperand)
          console.log("OPERATION " + payload.digit)
          console.log("------------------------------")
          if (state.previousOperand == null && state.currentOperand == null) {
            return state
          }
          if (state.currentOperand == null) {
            return {
              ...state,
              operation: payload.digit
            }
          }


          if (state.previousOperand == null) {
            return {
              ...state,
              previousOperand: state.currentOperand,
              currentOperand: null,
              operation: payload.digit
            }
          }
          return {
            ...state,
            previousOperand: evaluate(state),
            currentOperand: null,
            operation: payload.digit
          }

        }
      default:
        break;

    }
  }
  function evaluate({ currentOperand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) { return "" }
    let computation = ""
    switch (operation) {
      case "+":
        computation = prev + current
        break;
      case "-":
        computation = prev - current
        break
      case "*":
        computation = prev * current
        break
      case "/":
        computation = prev / current
        break;

      default:
        break;
    }
    console.log("computation " + computation)
    return computation
  }
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})
  // dispatch(
  //   {
  //     type: ACTIONS.ADD_DIGIT,
  //     payload: { digit: 1 }
  //   }
  // )
  // console.log(currentOperand + " " + previousOperand)
  return (
    <div className="p-10 border flex items-center justify-center border-black">
      <div className="w-1/2 border border-black p-5">
        <div className="bg-black border text-white font-bold text-2xl border-black text-right h-20">
          <div>{previousOperand} {operation}</div>
          <div>{currentOperand}</div>
        </div>
        <div className="grid grid-cols-3">
          <Operation
            width={1 / 2}
            data="DEL"
            dispatch={dispatch}
          ></Operation>
          <Operation
            width={1 / 4}
            data="AC"
            dispatch={dispatch}
          ></Operation>
          <Operation
            width={1 / 4}
            data="/"
            dispatch={dispatch}
          ></Operation>
        </div>

        <div className="grid grid-cols-4">
          <Digits width={1 / 4} data="1" dispatch={dispatch} />
          <Digits width={1 / 4} data="2" dispatch={dispatch} />
          <Digits width={1 / 4} data="3" dispatch={dispatch} />
          <Operation width={1 / 4} data="*" dispatch={dispatch} />
        </div>
        <div className="grid grid-cols-4">
          <Digits width={1 / 4} data="4" dispatch={dispatch} />
          <Digits width={1 / 4} data="5" dispatch={dispatch} />
          <Digits width={1 / 4} data="6" dispatch={dispatch} />
          <Operation width={1 / 4} data="+" dispatch={dispatch} />
        </div>
        <div className="grid grid-cols-4">
          <Digits width={1 / 4} data="7" dispatch={dispatch} />
          <Digits width={1 / 4} data="8" dispatch={dispatch} />
          <Digits width={1 / 4} data="9" dispatch={dispatch} />
          <Operation width={1 / 4} data="-" dispatch={dispatch} />
        </div>
        <div className="grid grid-cols-3">
          <Digits
            width={1 / 2}
            data="."
            dispatch={dispatch}
          ></Digits>
          <Digits
            width={1 / 4}
            data="0"
            dispatch={dispatch}
          ></Digits>
          <Operation
            width={1 / 4}
            data="="
            dispatch={dispatch}
          ></Operation>
        </div>
      </div>
    </div>
  );
}

export default App;
