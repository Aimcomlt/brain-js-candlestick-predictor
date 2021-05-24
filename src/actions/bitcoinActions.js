import axios from "axios";
import moment from "moment";

import brain from 'brain.js/src/index';
const RightHighNet = new brain.NeuralNetwork();
const LeftLowNet = new brain.NeuralNetwork();
const CenterOpenNet = new brain.NeuralNetwork();
const CenterCloseNet = new brain.NeuralNetwork();

const OpenVS = [];
const CloseVS = [];
const HighVS = [];
const LowVS = [];
const lableBox = [];
const OpenBrainResult = [];
const CloseBrainResult = [];
const HighBrainResult = [];
const LowBrainResult = [];








export const getData = ({ time, number }) => async dispatch => {
  try {
    dispatch({
      type: "AWAITING_BITCOIN"
    })
     //FREE APIKEY HERE--->https://financialmodelingprep.com/developer/docs/
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/${time}/BTCUSD?apikey=df8f3193c67e3f800048dc4863a1984e`)

     
    OpenVS.unshift(response.data[0].open);
    CloseVS.unshift(response.data[0].close);
    HighVS.unshift(response.data[0].high);
    LowVS.unshift(response.data[0].low);
    lableBox.unshift(moment(response.data[0].date).format("LT"));

    //console.log(depth)






   
    const labels = [];
    const close = [];
    const highA = [];
    const high = [];
    const low = [];
    const open = [];
    const openMA = [];

    for (let i = 0; i < (number); i++) {
     // let depth = response.data.length;
      highA.unshift(response.data[i].high)
      close.unshift(response.data[i].close)
      low.unshift(response.data[i].low)
      open.unshift(response.data[i].open)
      openMA.push(response.data[i].open)
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

    const finalOpenMA = [];
    for (let depth = 0; depth < openMA.length; depth ++) {
      finalOpenMA.push((openMA[depth] + openMA[depth + 1] + openMA[depth + 2] +  openMA[depth + 2]) * 0.25) 
    }
 //console.log('OPEN MA: ', openMA);
 //console.log('OPEN MA: ', finalOpenMA)

// THE CENTER BRAIN OPEN PRICE PREDICTION
    const CenterOpenBrain = [];
    for (let i = 0; i < number; i++) {


      CenterOpenBrain.unshift({
		  input: {
      opma: finalOpenMA[i] * 0.00001,
			 hgh: response.data[i].high * 0.00001,
			  lw: response.data[i].low * 0.00001,
			  cl: response.data[i].close * 0.00001,
			      },
		  output: {
			  op: response.data[i].open * 0.00001,
					}
        })
      }
     // console.log('BRAIN OPEN PRICE TRAINING ARRAY : ', CenterOpenBrain)

      CenterOpenNet.train(CenterOpenBrain, {
        iterations: 20500,
        errorThresh: 0.0005,
        log: false,
        learningRate: 0.3,
        momentum: 0.08
           });

           const CenterOpenResult = CenterOpenNet.run({
                  opma: finalOpenMA[0] * 0.00001,
                   hgh: response.data[0].high * 0.00001 ,
                    lw: response.data[0].low * 0.00001,
                    cl: response.data[0].close * 0.00001,
                    });//console.log(finalOpenMA[0])
// THE CENTER BRAIN CLOSE PRICE PREDICTION
                    const CenterCloseBrain = [];
                    for (let i = 0; i < number; i++) {

                      CenterCloseBrain.unshift({
                        input: {
                    //  clma: response.data[i].close * 0.00001 + response.data[i - 1].close * 0.00001 + response.data[i - 2].close * 0.00001 * 0.33333333,
			                 hgh: response.data[i].high * 0.00001,
			                  lw: response.data[i].low * 0.00001,
                        op: response.data[i].open * 0.00001
                      },
                      output: {
                         cl: response.data[i].close * 0.00001
                        }
                      })
                    }
                 //   console.log('BRAIN CLOSE PRICE TRAINING ARRAY : ', CenterCloseBrain)
                    CenterCloseNet.train(CenterCloseBrain, {
                        errorThresh: 0.0005,
                        log: true, 
                        learningRate: 0.3,
                        momentum: 0.08
                       });
                       const CenterCloseResult = CenterCloseNet.run({
                      //  clma: response.data[number].close * 0.00001 + response.data[number - 1].close * 0.00001 + response.data[number - 2].close * 0.00001 * 0.33333333,
                         hgh: response.data[0].high * 0.00001,
                          lw: response.data[0].low * 0.00001,
                          op: response.data[0].open * 0.00001,
                        });
         // THE RIGHT BRAIN HIGH PRICE PREDICTION
                    const RightHighBrain = [];
                    for (let i = 0; i < number; i++) {

                      RightHighBrain.unshift({
                        input: {
                       //  hghma: response.data[i].high * 0.00001 + response.data[i - 1].high * 0.00001 + response.data[i - 2].high * 0.00001 * 0.33333333,
                            cl: response.data[i].close * 0.00001,
			                      lw: response.data[i].low * 0.00001,
                            op: response.data[i].open * 0.00001
                      },
                      output: {
                         hgh: response.data[i].high * 0.00001,
                        }
                      })
                    }
                //    console.log('BRAIN HIGH PRICE TRAINING ARRAY :', RightHighBrain)
                    RightHighNet.train(RightHighBrain, {
                        errorThresh: 0.0005,
                        log: true, 
                        learningRate: 0.3,
                        momentum: 0.08
                       });
                       const RightHighResult = RightHighNet.run({
                     //  hghma: response.data[number].high * 0.00001 + response.data[number - 1].high * 0.00001 + response.data[number - 2].high * 0.00001 * 0.33333333,
                          lw: response.data[0].low * 0.00001,
                          op: response.data[0].open * 0.00001,
                          cl: response.data[0].close * 0.00001,
                        });
                      
                      /*
                      //  test the data 
                        let a = [];
                        a.push(response.data[0].high)
                        console.log(a)
                        */

       // THE LEFT BRAIN LOW PRICE PREDICTION
                    const LeftLowBrain = [];
                    for (let i = 0; i < number; i++) {

                      LeftLowBrain.unshift({
                        input: {
                         
                          hgh: response.data[i].high * 0.00001,
                          cl: response.data[i].close * 0.00001,
                          op: response.data[i].open * 0.00001
                      },
                      output: {
                        lw: response.data[i].low * 0.00001,
                      }
                      })
                    }
                 //   console.log('BRAIN LOW PRICE TRAINING ARRAY :', LeftLowBrain)
                    LeftLowNet.train(LeftLowBrain, {
                        errorThresh: 0.0005,
                        log: true, 
                        learningRate: 0.3,
                        momentum: 0.08
                       });
                       const LeftLowResult = LeftLowNet.run({
                      
                         hgh: response.data[0].high * 0.00001,
                          op: response.data[0].open * 0.00001,
                          cl: response.data[0].close * 0.00001,
                        });

//console.log('OPEN PREDICTION: ', CenterOpenResult.op / 0.00001 );
//console.log('CLOSE PREDICTION: ', CenterCloseResult.cl / 0.00001 );
//console.log('HIGH PREDICTION: ', RightHighResult.hgh / 0.00001);
//console.log('LOW PREDICTION: ', RightLowResult.lw / 0.00001);


  LowBrainResult.unshift(LeftLowResult.lw / 0.00001);
  HighBrainResult.unshift(RightHighResult.hgh / 0.00001);
  CloseBrainResult.unshift(CenterCloseResult.cl / 0.00001);
  OpenBrainResult.unshift(CenterOpenResult.op / 0.00001);

  const lowVS = [];
  const lowVSI = [];
  
  for(let i = 0; i < LowBrainResult.length; i++) {
    if(lowVS.length <= number) {lowVS.unshift(LowBrainResult[i])}else{lowVSI.push(lowVS[0])}   
    if(lowVS.length === number) {lowVSI.splice(0,lowVS[0])}                              
      }

  console.log("Low: ",lowVS)
  console.log("LowI: ",lowVSI)

  const hghVS = [];
  const hghVSI = [];
  
  for(let i = 0; i < HighBrainResult.length; i++) {
    if(hghVS.length <= number) {hghVS.unshift(HighBrainResult[i])}else{hghVSI.push(hghVS[0])}   
    if(hghVS.length === number) {hghVSI.splice(0,hghVS[0])}                              
    }
    
  console.log("High: ",hghVS)
  console.log("HighI: ",hghVSI)

  const clVS = [];
  const clVSI = [];
  
  for(let i = 0; i < CloseBrainResult.length; i++) {
    if(clVS.length <= number) {clVS.unshift(CloseBrainResult[i])}else{clVSI.push(clVS[0])}   
    if(clVS.length === number) {clVSI.splice(0,clVS[0])}                              
    
  }
  console.log("Close: ",clVS)
  console.log("CloseI: ",clVSI)


const opVS = [];
const opVSI = [];

for(let i = 0; i < OpenVS.length; i++) {
  if(opVS.length <= number) {opVS.unshift(OpenVS[i])}else{opVSI.push(opVS[0])}   
  if(opVS.length === number) {opVSI.splice(0,opVS[0])}                              
  
}
console.log("Open: ",opVS)
console.log("OpenI: ",opVSI)


const brOP =[];
const brOPI =[];

for(let i = 0; i < OpenBrainResult.length; i++) {
  if(brOP.length <= number) {brOP.unshift(OpenBrainResult[i])}else{brOPI.push(brOP[0])}   
  if(brOP.length === number) {brOPI.splice(0,brOP[0])} 
}

console.log("brainOpen: ",brOP)
console.log("brainOpenI: ",brOPI)
//console.log("Real vs predicted", opVS[0] - brOP[0])
//console.log("Predicted vs Real Open", brOP[0] - opVS[0])
//console.log('closeBrain vs Realclose', CloseBrainResult[0] - CloseVS[0])
//console.log('Real high vs Predicted high', HighVS[0] - HighBrainResult[0]);
//console.log('Real Low vs Predicted Low', LowVS[0] - LowBrainResult[0]);

const LowPredicted = [LowBrainResult[0] - LowVS[0]];
const RealLow = [LowVS[0] - LowBrainResult[0]];

const HghPredicted = [HighBrainResult[0] - HighVS[0]]
const RealHigh = [HighVS[0] - HighBrainResult[0]];

 const ClsPredicted = [CloseBrainResult[0] - CloseVS[0]];
 const RealClose = [CloseVS[0] - CloseBrainResult[0]];

 const RvsPredicted = [];
 for (let i = 0; i < opVS.length; i++) {
        RvsPredicted.push(opVS[i] - brOP[i])
 }
 const PvsReal = [];
 for (let i = 0; i < opVS.length; i++) {
    PvsReal.push(brOP[i] - opVS[i])
 }

const laBox = [];
const laBoxI = [];
for(let i = 0; i < lableBox.length; i++) {
  if(laBox.length <= number) {laBox.unshift(lableBox[i])}else{laBoxI.push(laBox[0])}   
  if(laBox.length === number) {laBoxI.splice(0,laBox[0])} 
  
}
console.log("lable: ",laBox)
console.log("lableI: ",laBoxI)

const midOP = [];
const midOPI = [];
for(let i = 0; i < hghVS.length; i++) {
  if(midOP.length <= number) {midOP.unshift(((HighBrainResult[i] + OpenBrainResult[i] + CloseBrainResult[i]) + LowBrainResult[i]) / 4)}else{midOPI.unshift(((HighBrainResult[i] + OpenBrainResult[i] + CloseBrainResult[i]) + LowBrainResult[i]) / 4)}   
  if(midOP.length === number) {midOPI.splice(0, midOP[0])}
}
console.log("midleLine: ",midOP)
console.log("midleLineI: ",midOPI)



//const original = [response.data[0].open];
//let newArray;

//newArray = original.concat(response.data[0].open);
//newArray = [...original, response.data[0].open];
//OPEN.push(newArray)
//console.log(OPEN)



    dispatch({
      type: "SUCCESS_BITCOIN",
      payload: {
         number,
         midOP,
         laBox,
         opVS,
         clVS,
         hghVS,
         lowVS,
         brOP,

         ClsPredicted,
         RealClose,

         HghPredicted,
         RealHigh,

         LowPredicted,
         RealLow,

         RvsPredicted,
         PvsReal,
            
         OpenBrainResult,
         CloseBrainResult,
         HighBrainResult,
         LowBrainResult,

         open,
         low,
         high,
         close,
         labels
      }
    })
  } catch (e) {
    dispatch({
      type: "REJECTED_BITCOIN",
    })
  }
}





