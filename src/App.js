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

    
   
    setTokenAPI(token)
    setLoad(false)
    

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


  const Tracking = (product) => () =>{
    setLoad(true)
    getItems(tokenAPI , product)
  }


  return (
    <div className="App" style={{display:"flex",justifyContent:"center",alignItems:"center", width:"100%" ,height:"100vh" , flexDirection:"column" , backgroundColor:'#c9d0ff'}}>
      <div style={{display:'flex' , justifyContent:'space-evenly' , width:'100%' , height:'50%' , backgroundColor:'#a0a8d9' , marginBottom:'2rem'}}>
        {load ? 'LOAD' : text.map((data , idx)=>{
              return <div style={{display:'flex' , justifyContent:'center' , alignItems:'center'}}key={idx}><List location={data.location} status={data.status_description} date={data.status_date} recieve={data.receiver_name}/></div>
            })}
      </div>
      <input type="text" value={ems} placeholder="ป้อนเลขพัสดุ" onChange={(e)=>setEMS(e.target.value)} style={{width:'300px' , textAlign:'center' , fontSize:'20px' , marginBottom:'2rem' , borderRadius:'3rem' , outline:'none' , padding:'0.5rem 0rem' , border:'0 none'}}/>
      <button className="Button" onClick={Tracking(ems)}>เช็คสถานะ</button>
    </div>
  );
}

export default App;
