import React from 'react'

function list(props) {
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%" , height:"100%",flexDirection:'column'}}>
            <h1>{props.location}</h1>
            <p>สถานะ: {props.status}</p>
            <p>เวลา: {props.date.substring(0,19)}</p>
            <p>{props.recieve}</p>
        </div>
    )
}

export default list
