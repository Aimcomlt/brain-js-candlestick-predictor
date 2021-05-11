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
    labels: [],
    datasets: [{
      label: "BTC High",
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
            backgroundColor: 'rgba(238,175,0, 0.4)',
            borderColor: 'rgba(238,175,0, 0.5)',
            pointBorderColor: color,
            order: 1
          },{
            label: "BTC HIGH",
            data: payload.high,
            backgroundColor:color,
            borderColor: 'rgba(238,175,0, 0.5)',
            pointBorderColor: color,
            order: 2
          },{
            label: "BTC LOW",
            data: payload.low,
            backgroundColor: 'rgba(238,112,0, 0.5)',
            borderColor: color,
            pointBorderColor: color,
            order: 3
          }]
        },
        high: {
          labels: payload.labels,
          datasets: [{
            label: "BTC HIGH",
            data: payload.high,
            backgroundColor:color,
            borderColor: 'rgba(238,175,0, 0.5)',
            pointBorderColor: color,
            order: 2
          }]
        },
        options:{
          scales:{
            y: {
              max: 65000,
              min: 0,
              ticks: {
                  stepSize: 200
              }
          },
            yAxes: {
              ticks: {
                reverse: true,
                beginAtZero: true
              }
            }
          }
        }      
      }
    default:
      return state;
  }
  
}
export default bitcoinReducer;
