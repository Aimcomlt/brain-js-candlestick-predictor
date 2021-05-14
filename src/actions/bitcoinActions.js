import axios from "axios";
import moment from "moment";
import brain from 'brain.js/src/index';
const RightHighNet = new brain.NeuralNetwork();
const LeftLowNet = new brain.NeuralNetwork();
const CenterOpenNet = new brain.NeuralNetwork();
const CenterCloseNet = new brain.NeuralNetwork();

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
// THE CENTER BRAIN OPEN PRICE PREDICTION
    const CenterOpenBrain = [];
    for (let i = 0; i < number; i++) {


      CenterOpenBrain.unshift({
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
      console.log('BRAIN OPEN PRICE TRAINING ARRAY : ', CenterOpenBrain)

      CenterOpenNet.train(CenterOpenBrain, {
        iterations: 20000,
        errorThresh: 0.0005,
        log: false,
        learningRate: 0.3,
        momentum: 0.08
           });

           const CenterOpenResult = CenterOpenNet.run({
                   hgh: response.data[number].open / 77777 ,
                   lw: response.data[number].open / 77777,
     // op: response.data[number] / 77777,
                   cl: response.data[number].open / 77777,
                    });
// THE CENTER BRAIN CLOSE PRICE PREDICTION
                    const CenterCloseBrain = [];
                    for (let i = 0; i < number; i++) {

                      CenterCloseBrain.unshift({
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
                    console.log('BRAIN CLOSE PRICE TRAINING ARRAY : ', CenterCloseBrain)
                    CenterCloseNet.train(CenterCloseBrain, {
                        errorThresh: 0.0005,
                        log: true, 
                        learningRate: 0.3,
                        momentum: 0.08
                       });
                       const CenterCloseResult = CenterCloseNet.run({
                          hgh: response.data[number].close / 77777,
                          lw: response.data[number].close / 77777,
     // op: response.data[number] / 77777,
                          cl: response.data[number].close / 77777,
                        });
         // THE RIGHT BRAIN HIGH PRICE PREDICTION
                    const RightHighBrain = [];
                    for (let i = 0; i < number; i++) {

                      RightHighBrain.unshift({
                        input: {
                        cl: response.data[i].close / 77777,
			                  lw: response.data[i].low / 77777,
                        op: response.data[i].open / 77777
                      },
                      output: {
                         hgh: response.data[i].high / 77777,
                        }
                      })
                    }
                    console.log('BRAIN HIGH PRICE TRAINING ARRAY :', RightHighBrain)
                    RightHighNet.train(RightHighBrain, {
                        errorThresh: 0.0005,
                        log: true, 
                        learningRate: 0.3,
                        momentum: 0.08
                       });
                       const RightHighResult = RightHighNet.run({
                          
                          lw: response.data[number].close / 77777,
                          op: response.data[number].open / 77777,
                          cl: response.data[number].close / 77777,
                        });
       // THE LEFT BRAIN LOW PRICE PREDICTION
                    const LeftLowBrain = [];
                    for (let i = 0; i < number; i++) {

                      LeftLowBrain.unshift({
                        input: {
                          hgh: response.data[i].high / 77777,
                          cl: response.data[i].close / 77777,
                          op: response.data[i].open / 77777
                      },
                      output: {
                        lw: response.data[i].low / 77777,
                      }
                      })
                    }
                    console.log('BRAIN LOW PRICE TRAINING ARRAY :', LeftLowBrain)
                    LeftLowNet.train(LeftLowBrain, {
                        errorThresh: 0.0005,
                        log: true, 
                        learningRate: 0.3,
                        momentum: 0.08
                       });
                       const RightLowResult = LeftLowNet.run({
                          hgh: response.data[number].high / 77777,
                          op: response.data[number].open / 77777,
                          cl: response.data[number].close / 77777,
                        });

console.log('OPEN PREDICTION: ', CenterOpenResult.op * 77777 );
console.log('CLOSE PREDICTION: ', CenterCloseResult.cl * 77777 );
console.log('HIGH PREDICTION: ', RightHighResult.hgh * 7777);
console.log('LOW PREDICTION: ', RightLowResult.lw * 7777);
const OpenBrainResult = [];
const CloseBrainResult = [];
const HighBrainResult =[];
const LowBrainResult =[];
const resultRvsL = [];


  LowBrainResult.push(RightLowResult.lw * 77777);
  HighBrainResult.push(RightHighResult.hgh * 77777);
  CloseBrainResult.push(CenterCloseResult.cl * 77777);
  OpenBrainResult.push(CenterOpenResult.op * 77777);
  resultRvsL.push((CloseBrainResult + OpenBrainResult) * .5);

    dispatch({
      type: "SUCCESS_BITCOIN",
      payload: {
        resultRvsL,
         OpenBrainResult,
         CloseBrainResult,
         HighBrainResult,
         LowBrainResult,
        open,
        low,
        high,
        data,
        labels
      }
    })
    
  } catch (e) {
    dispatch({
      type: "REJECTED_BITCOIN",
    })
  }
}
