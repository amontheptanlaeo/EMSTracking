import React from 'react'
import './Card.css'
function list(props) {
    return (
        <div className="Card" >
            <h1>{props.location}</h1>
            <p>สถานะ: {props.status}</p>
            <p>เวลา: {props.date.substring(0,19)}</p>
            <p>{props.recieve}</p>
        </div>
    )
}

export default list
