import React,{useState} from 'react'
import PropTypes from 'prop-types'
import "../index.css"
import axios from 'axios'
import sunny from '../images/Sunny.jpg'
const Searchbox=(props)=>{
const [text, setText] = useState("")
const [show, setShow] = useState(false)
const [picture, setPicture] = useState("")
const [temp, setTemp] = useState(0)
const [articles, setArticles] = useState([])
const handleOnclick=async(e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/searching',{
        place:text,
    }).then(function(response){
        console.log("response hase been reicebded");
    }).catch(function(err){
        console.log(err);
})
    let text1=text;
    console.log(props);
    let url=`http://api.weatherapi.com/v1/current.json?key=${props.apiKey}&q=${text1}`;
    let data=await fetch(url);
    let parsed=await data.json()
    if(parsed.current.condition.text==='Sunny'){
        
        setPicture(sunny);
    }
    setShow(true)
    setPicture(parsed.current.condition.icon)
    setTemp(parsed.current.temp_c)
    setArticles(parsed);

    console.log(parsed.current);
}
const handleOnchange=(e)=>{
setText(""+e.target.value);
}
    return(
        <>
        <div className='position-absolute top-0 start-50 translate-middle'>

        <form className="d-flex" role="search">
        <input className="form-control me-2" id='myinput'type="search" style={{marginTop:"15rem",height:"4rem",width:"300px",fontFamily:"Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",fontSize:"1.42857143em"}} placeholder="Search the weather in..." aria-label="Search" onChange={handleOnchange} value={text}/>
        <button className="btn btn-outline-success"style={{backgroundColor:"black",color:"white",marginTop:"15rem",width:"7rem"}} onClick={handleOnclick} type="submit">{props.search}</button>
      </form>
        </div>
      {show && <div class ="weather-boards" style={{display:"grid",gridGap:"2em",gridTemplateColumns:"20rem auto",padding:"10px",margin:"auto",justifyContent:"center"}}>
            <div style={{marginTop:"200px",border:"1px solid #28a2a2",boxShadow:"0.15rem 0.15rem 0.5rem rgb(0 0 0 / 10%)",textAlign:"center",backgroundColor:"#fff",alignItems:"center",justifyContent:"center",height:"475px"}}>
                <div style={{fontFamily:"Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"}}>
                    <h1 style={{fontSize:"6rem",fontFamily:"Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"}}>{temp}°</h1>
                    <img src={picture} style={{width:"50%"}} alt="icon"/>
                    <p >{articles.current.condition.text}</p>
                    <p >Cloud as of {articles.current.last_updated}</p>
                    <p style={{fontSize:"1.71428571rem",marginTop:"1rem",wordWrap:"break-word"}}>{articles.location.name},{articles.location.region},{articles.location.country}</p>
                </div>
            </div>
            <div className='weather right-Board' style={{fontFamily:"Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",display:"grid",gridTemplateColumns:"auto auto",gridGap:"2em",rowGap:"2em",columnGap:"2em",width:"35rem",marginTop:"200px",border:"1px solid #28a2a2",boxShadow:"0.15rem 0.15rem 0.5rem rgb(0 0 0 / 10%)",textAlign:"center",backgroundColor:"#fff",alignItems:"center",justifyContent:"center"}}>
                <div className='weather detail' style={{display:"grid",borderBottom:"1px dotted grey",padding:"10px 10px 10px 10px",width:"14rem",gridTemplateColumns:"6rem 10rem"}}>
                    <div>
                        <h4 style={{fontSize:"1.50142857rem",marginTop:"13px"}}>Humidity</h4>
                    </div>
                    <div>
                        <p style={{fontSize:"1.45142857rem",marginTop:"12px"}}>{articles.current.humidity}% </p>
                    </div>
                </div>
                <div className='weather detail' style={{gridTemplateColumns:"6rem 7rem",marginTop:"16px",display:"grid",borderBottom:"1px dotted grey",padding:"10px",width:"14rem"}}>
                <div>
                    <h4 style={{fontSize:"1.50142857rem"}}>Wind</h4>
                </div>
                <div>
                    <p style={{fontSize:"1.45143rem"}}>{articles.current.wind_kph} km/hr </p>
                </div>
                </div>
                <div className='weather detail' style={{gridTemplateColumns:"6rem 7rem",display:"grid",borderBottom:"1px dotted grey",padding:"10px",width:"14rem"}}>
                <div>
                    <h4 style={{fontSize:"1.50142857rem"}}>Wind-Direction</h4>
                </div>
                <div>
                    <p style={{fontSize:"1.45143rem"}}>{articles.current.wind_degree}° </p>
                </div>
                </div>
                <div className='weather detail' style={{gridTemplateColumns:"6rem 7rem",display:"grid",borderBottom:"1px dotted grey",padding:"10px",width:"14rem"}}><div>
                    <h4 style={{fontSize:"1.50142857rem",marginTop:"14px"}}>Pressure</h4>
                </div>
                <div>
                    <p style={{fontSize:"1.45143rem"}}>{articles.current.pressure_in} km/hr </p>
                </div>
                </div>
            </div>
            </div>}
        </>
    )
}
export default Searchbox;
  Searchbox.propTypes = {
    search: PropTypes.string
  };
  