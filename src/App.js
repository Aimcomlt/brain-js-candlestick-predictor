import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { Line } from 'react-chartjs-2';
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
        <h1>MadeIndreamTeam</h1>
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
      </div>
      
  
  );
}

export default App;
