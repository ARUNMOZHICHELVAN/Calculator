import { ACTIONS } from "./App"


export default function Operation(props) {
    const x = props.data
    return (
        <div
            onClick={() => props.dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { digit: x } })}
            className={`flex w-${props.width} border text-center border-black `}>
            <button className="text-center mx-auto">{props.data}</button>
        </div>
    )
}