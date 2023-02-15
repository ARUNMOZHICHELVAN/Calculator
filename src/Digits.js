// import { update } from "tar"

import { ACTIONS } from "./App";

export default function smallbox(props) {
    // console.log(props.data + " ")
    // console.log(props.dispatch)
    const x = props.data
    // console.log(x)
    return (
        <div
            onClick={() => props.dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: x } })}
            className={`flex w-${props.width} border text-center border-black `}>
            <button className="text-center mx-auto">{props.data}</button>
        </div>
    )
} 