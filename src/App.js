import React, { useState, useEffect } from 'react'
import List from './list'
import axios from "axios";
import './App.css';

function App() {

  const [text, setText] = useState([])
  const [load, setLoad] = useState(false)
  const [tokenAPI, setTokenAPI] = useState(null)
  const [ems, setEMS] = useState('')

  const options1 = {
    method: 'POST',
    url: 'https://trackapi.thailandpost.co.th/post/api/v1/authenticate/token',
    headers: {
      'Authorization': 'Token IrPpAhL@AhLdWBPaMBEOG7BTH^RQEVJtFqYzVeL#CoEKOiZAPxTbOLNzR^NVB9L$E^BlBwM;ZWT!R_VGLYZmUbBFH;GdZ-ILRbBa',
      'Content-Type': 'application/json'
    }
  };


  




  useEffect(() => {

    setLoad(true);
    getToken();
    
  }, []);

  const getToken = async() => {

    const token = await axios.request(options1).then((response) => {
      const data = response.data
      return data.token
     
    }).catch(function (error) {
      console.error(error);
    });

    
    getItems(token , 'RJ249095171TH')
    setTokenAPI(token)

  }

  const getItems = async(token , product) => {

    const options2 = {
      method: 'POST',
      url: 'https://trackapi.thailandpost.co.th/post/api/v1/track',
      headers: {
        'Authorization': 'Token '+ token,
        'Content-Type': 'application/json'
      },
      data: {
        "status": "all",
        "language": "TH",
        "barcode": [
          `${product}`
        ]
      }
    };
    

    const items = await axios.request(options2).then((response) => {
      const data = response.data
      return data.response.items[product]
     
    }).catch(function (error) {
      console.error(error);
    });

    setText(items)
    setLoad(false)

  }


  const reload = (product) => () =>{
    setLoad(true)
    getItems(tokenAPI , product)
  }


  return (
    <div className="App" style={{display:"flex",justifyContent:"center",alignItems:"center", width:"100%" ,height:"100vh" , flexDirection:"column"}}>
      <div style={{backgroundColor:"#5999ff",width:"100%" ,display:'flex' , justifyContent:"center", alignItems:"center" , padding:"2rem" , border:"3px solid black" , borderRadius:"2rem"}}>
        {load ? 'LOAD' : text.map((data , idx)=>{
              return <div key={idx}><List location={data.location} status={data.status_description} date={data.status_date} recieve={data.receiver_name}/></div>
            })}
      </div>
      <input type="text" value={ems} onChange={(e)=>setEMS(e.target.value)}/>
      <button onClick={reload(ems)}>Track</button>
        
    </div>
  );
}

export default App;
