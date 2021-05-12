import axios from "axios";
import moment from "moment";
import brain from 'brain.js/src/index';
const RightNet = new brain.NeuralNetwork();
const LeftNet = new brain.NeuralNetwork();

export const getData = ({ time, number }) => async dispatch => {
  try {
    dispatch({
      type: "AWAITING_BITCOIN"
    })
     //FREE APIKEY HERE--->https://financialmodelingprep.com/developer/docs/
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/${time}/BTCUSD?apikey=df8f3193c67e3f800048dc4863a1984e`)
    //console.log("response", response.data)
   
    const labels = [];
    const data = [];
    const highA = [];
    const high = [];
    const low = [];
    const open = [];
    for (let i = 0; i < number; i++) {
      highA.unshift(response.data[i].high)
      data.unshift(response.data[i].close)
      low.unshift(response.data[i].low)
      open.unshift(response.data[i].open)
      labels.unshift(moment(response.data[i].date).format("LT"))

      if (i === (number - 1)) {
        break;
      }
    }
    for (let i = 0; i < number; i++) {
      high.push(highA[i])
      if (i === (number - 1)) {
        break;
      }
    }

    const RightBrain = [];
    for (let i = 0; i < number; i++) {


	  RightBrain.push({
		  input: {
			  hgh: response.data[i].high / 77777,
			  lw: response.data[i].low / 77777,
			  cl: response.data[i].close / 77777,
			


		},
		  output: {
			  op: response.data[i].open / 77777,
			
		}
	})
    }
    console.log(RightBrain)

    RightNet.train(RightBrain, {
      iterations: 20000,
      errorThresh: 0.0005,
      log: false,
      learningRate: 0.3,
      momentum: 0.08
      });
  
   const resultRight = RightNet.run({
      hgh: response.data[number],
      lw: response.data[number],
     // op: response.data[number] / 77777,
      cl: response.data[number],
  });
    const LeftBrain = [];
    for (let i = 0; i < number; i++) {


	  LeftBrain.push({
		  input: {
			  hgh: response.data[i].high / 77777,
			  lw: response.data[i].low / 77777,
        op: response.data[i].open / 77777
			  
			


		},
		  output: {
			  cl: response.data[i].close / 77777
			
		}
	})
    }
    console.log(LeftBrain)
    LeftNet.train(LeftBrain, {
      iterations: 20000,
      errorThresh: 0.0005,
      log: true,
      learningRate: 0.3,
      momentum: 0.08
      });
  
   const resultLeft = LeftNet.run({
      hgh: response.data[number] / 77777,
      lw: response.data[number] / 77777,
     // op: response.data[number] / 77777,
      cl: response.data[number] / 77777,
  });
 // var resultL = resultLeft * 77777
 //var resultR = resultLeft * 77777
console.log('OPEN PREDICTION: ', resultRight)
console.log('CLOSE PREDICTION: ', resultLeft)

    dispatch({
      type: "SUCCESS_BITCOIN",
      payload: {
       // resultL,
       //resultR,
        open,
        low,
        high,
        data,
        labels
      }
    })
    

    console.log(high.length)
    console.log(high)
    console.log(data)
    console.log(labels)
  } catch (e) {
    dispatch({
      type: "REJECTED_BITCOIN",
    })
  }
}
