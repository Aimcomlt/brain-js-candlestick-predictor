import axios from "axios";
import moment from "moment";

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
    dispatch({
      type: "SUCCESS_BITCOIN",
      payload: {
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
