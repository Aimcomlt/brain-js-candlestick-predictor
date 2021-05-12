var r = () => Math.random() * 256 >> 0;
var color = `rgb(${r()}, ${r()}, ${r()})`;
const initalState = {
  loading: false,
  data: {
    labels: [],
    datasets: [{
      label: "BTC close",
      high: [],
      backgroundColor: color,
      borderColor: color,
      pointBorderColor: color,
     
    }],
    
  },
  high: {
   // labels: [],
    datasets: [{
      label: "BOT CHART PREDICTION",
      high: [],
      backgroundColor: 'rgba(238,175,0, 0.4)',
      borderColor: color,
      pointBorderColor: 'rgba(238,175,0, 0.7)',
     
    }]
  }
};

const bitcoinReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "AWAITING_BITCOIN":
      return {
        ...state,
        loading: true
      }
    case "REJECTED_BITCOIN":
      return {
        ...state,
        loading: false,
      }
    case "SUCCESS_BITCOIN":
      return {
        ...state,
        loading: false,
        data: {
          labels: payload.labels,
          datasets: [{
            label: "BTC CLOSE",
            data: payload.data,
            backgroundColor: 'rgba(226, 153, 18, 0.9)',
            borderColor: 'rgba(178, 116, 0, 1)',
            pointBorderColor: 'rgba(25, 16, 0, 1)',
            order: 2
          },
          {
            type: 'line',
            label: "BTC OPEN",
            data: payload.open,
            backgroundColor: 'rgba(10, 204, 0, 0.1)',
            borderColor: 'rgba(10, 204, 0, 1)',
            pointBorderColor: 'rgba(25, 16, 0, 1)',
            order: 4
          },{
            type: 'line',
            label: "BTC HIGH",
            data: payload.high,
            backgroundColor:'rgba(22, 91, 160, 0.9)',
            borderColor: 'rgba(14, 38, 62,0.9)',
            pointBorderColor: 'rgba(22, 91, 160, 1)',
            order: 3               
          },{
            type: 'line',
            label: "BTC LOW",
            data: payload.low,
            backgroundColor: 'rgba(255, 0, 0, 0.4)',
            borderColor: '	rgba(255, 0, 0, 0.9)',
            pointBorderColor: 'rgba(25, 16, 0, 1)',
            order: 1
          },          {
            type: 'bar',
            label: "BOT CLOSE price prediction",
            data: payload.resultLeft,
            backgroundColor:'rgba(10, 204, 0, 0.8)',
            borderColor: 'rgba(10, 204, 0, 1)',
            pointBorderColor: 'rgba(10, 204, 0, 1)',
            order: 5
          },
          {
            type: 'bar',
            label: "BOT OPEN price prediction",
            data: payload.resultRight,
            backgroundColor:'rgba(10, 204, 0, 0.8)',
            borderColor: 'rgba(10, 204, 0, 1)',
            pointBorderColor: 'rgba(10, 204, 0, 1)',
            order: 6
          }]
        },
        high: {
         // labels: payload.labels,
          datasets: [{
            type: 'bubble',
            label: "BOT OPEN price prediction",
            data: payload.resultRight,
            backgroundColor:'rgba(10, 204, 0, 0.8)',
            borderColor: 'rgba(10, 204, 0, 1)',
            pointBorderColor: 'rgba(10, 204, 0, 1)',
            order: 1
          },
          {
            type: 'scatter',
            label: "BOT CLOSE price prediction",
            data: payload.resultLeft,
            backgroundColor:'rgba(10, 204, 0, 0.8)',
            borderColor: 'rgba(10, 204, 0, 1)',
            pointBorderColor: 'rgba(10, 204, 0, 1)',
            order: 2
          }]
        },            
      }
    default:
      return state;
  }
  
}
export default bitcoinReducer;
