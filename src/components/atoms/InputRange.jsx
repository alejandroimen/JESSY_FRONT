import React from "react";

function InputRange(props) {
    return (
        <input
            type="range"
            value={props.var}
            onChange={props.handleVarChange}
            min="0"
            max="500000"
        />
    )
}
export default InputRange;