import './App.css';
import background from './images/weather.jpg';
import React from 'react'
import Searchbox from './components/Searchbox';
function App() {
  const apiKey=process.env.REACT_APP_API_KEY
  




  document.body.style.backgroundImage=`url('${background}')`;

  document.body.style.backgroundSize='cover';


  return (
    <>
    <Searchbox apiKey={apiKey} search="search"/>
    </>
  );
}

export default App;
