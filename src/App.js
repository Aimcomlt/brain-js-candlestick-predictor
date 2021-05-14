import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { Line } from 'react-chartjs-2';
import { Radar } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./actions/bitcoinActions";

function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.bitcoin)
  const [num, setNum] = React.useState(15);

  const fetchData = (time) => {
    //Fetch data from redux using time
    dispatch(getData({
      time: time,
      number: num
    }))
  }

  return (
      <div className="App">
      <div className="navbar">
      <h1>ARTIFICIAL INTELIGENCE 🕯CANDLESTICK🕯 PREDICTOR</h1>
      <h5>POWERED BY BRAIN.JS</h5>
      </div>
      <div className="title">
      <h2>BTC/USD Timeseries</h2>
      </div>
      <div className={"btns-wrapper"}>

        <button onClick={() => fetchData("1min")}>1 Min</button>
        <button onClick={() => fetchData("5min")}>5 Min</button>
        <button onClick={() => fetchData("15min")}>15 Min</button>
        <button onClick={() => fetchData("30min")}>30 Min</button>
        <button onClick={() => fetchData("1hour")}>1 hour</button>
        <button onClick={() => fetchData("4hour")}>4 hour</button>

        <input onChange={e => setNum(e.target.value)} />
        {state.loading && <p>Loading...</p>}
      </div>
      <div className="info">
        <h4>Default Chart settings is set to 15 try more...entries by specifying any amount.</h4>
      </div>
         <div className={"chart-wrapper"}>
      <Line
          data={state.data}
      /></div>
          <div className={'explaination'}>
          <h3 className="infoB" style={{marginLeft:'150px'}}>
            IF THE OPEN IS GREATER THEN THE CLOSE 
            THE SNAPSHOT USED TO FORCE TRAIN THE BRAIN 
            IS PREDICTING  A RED  ⬇BAR  🟥</h3>
          <h3 className="infoB" style={{marginLeft:'150px'}}>
            IF THE CLOSE IS GREATER THEN THE OPEN
             THE SNAPSHOT USED TO FORCE TRAIN THE BRAIN
             IS PREDICTING A GREEN ⬆BAR 🟩</h3>
             <div className='infoC' style={{marginLeft:'150px'}}>
               <h4>⚠WARNING: PREDICTION CAN BE GREEN 🟩BAR AND YET CANDLESTICK CAN OPEN LOWER THEN LAST OPEN PRICE</h4>
               <h5 style={{marginleft:'150px'}}>MORE INFO IN THE DEVELOPER TOOLS</h5>
             </div>
            </div>
         <div className='container'>
         <div className='chartBar' style={{height:'800px', width:'800px'}}>
      <Bar
         data={state.dataC} options={{responsive: true}}
      /></div>
         <div>

      </div>
         <div className='chartBar'style={{height:'800px', width:'800px'}}>
      <Radar
         data={state.dataB} options={{responsive: true}}
      /></div>
      </div>
      </div>
  );
}

export default App;
