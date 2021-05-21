import React from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
//import { Radar } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./actions/bitcoinActions";

function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.bitcoin)
  const stateB = useSelector(state => state.brain)
  const [num, setNum] = React.useState(15);
    
  const fetchData = (time) => {
    //Fetch data from redux using time
    dispatch(getData({
      time: time,
      number: num,
    }))
  }

  return (
      <div className="App">
      <div className="navbar">
      <h1 style={{marginLeft:'13px', marginRight:'13px'}}>UNIVERSAL MARKET PRICE FUNCTION PREDICTOR</h1>
      <h5 style={{marginLeft:'25px'}}>POWERED BY BRAIN.JS, CHART JS, REDUX AND REACT APP</h5>
      </div>
      <div className="title">
      <h2 backgroundColor={ 'rgba(0, 0, 0, 0.)' }>BTC/USD Timeseries</h2>
      </div>
      <div className={"btns-wrapper"}>
      
        <button onClick={(() => {fetchData("1min")})}>INSERT DATA</button>
       <button onClick={() => setInterval(() => {fetchData("1min")}, 60100)}>1 Min</button>
       <button onClick={() => setInterval(() => {fetchData("5min")}, 300000)}>5 Min</button>
       <button onClick={() => setInterval(() => {fetchData("15min")}, 900000)}>15 Min</button>
       <button onClick={() => setInterval(() => {fetchData("30min")}, 1800000)}>30 min</button>
       <button onClick={() => setInterval(() => {fetchData("1hour")}, 3600000)}>1 Hour</button>
       <button onClick={() => setInterval(() => {fetchData("4hour")}, 14400000)}>4 Hour</button>




        
        <input onChange={e => setNum(e.target.value)} />
        <button onClick={() => clearInterval("1min", "5min", "15min", "30min", "1hour", "4hour")}>Pause Interval</button>
     
        {state.loading && <p>Loading...</p>}
      </div>
      <div className="info">
        <h4>Default Chart settings is set to 15 data points(x4,op,cl.hgh.lw) Choose any Interval. And specify any amount of data points .</h4>
        <h4>You can all so start as many interval as you want. Try only two to start example 89 min and 144 min </h4>
      </div>
         <div className={"chart-wrapper"}>
      <Line
          data={state.data} options={{responsive: true}}
      /></div>

         <div className='container'>
         <div className='chartBarVol' style={{height:'80%', width:'80%'}}>
         <Bar
         data={stateB.dataC} options={{responsive: true}}
         /></div>

         <div className='chartBarLin' style={{height:'2100px', width:'fit-content(100)'}}>
         <Line 
         data={stateB.dataD} options={{responsive: true}}
         /></div>
          </div>
           </div>
           );
          }
          export default App;
