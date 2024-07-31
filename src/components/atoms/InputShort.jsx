import React from "react";
import "../styles/atoms/InputShort.css"

function InputShort(props) {
    return (
        <div className="input-container">
            <label>{props.text}:</label>
            <input
                className="price-input-filter"
                type="number"
                value={props.var}
                onChange={props.handleVarChange}
                min="0"
                max="500000"
            />
        </div>
    )
}

export default InputShort;