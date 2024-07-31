import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../styles/atoms/ButtonReturn.css"

function ButtonReturn(props) {
    return (
        <div className="arrow-button-container">
            <Link className="link" to={`/${props.to}`}>
                <IoMdArrowRoundBack className="arrow" />
            </Link>
        </div>
    )
}

export default ButtonReturn;