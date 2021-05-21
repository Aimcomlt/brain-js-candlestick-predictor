//Random color generator
//var r = () => Math.random() * 256 >> 0;
//var color = `rgb(${r()}, ${r()}, ${r()})`;
//import number from '../App'
const initalState = {
  loading: false,
  data: {
    labels: [],
    datasets: [{
      type: 'line',
      label: "BTC close",
      data: [],
      backgroundColor: 'rgba(226, 153, 18, 0.9)',
      borderColor: 'rgba(178, 116, 0, 1)',
      pointBorderColor: 'rgba(25, 16, 0, 1)',
      borderWidth: 0.5
    }],
    
  },
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
            data: payload.close,
            backgroundColor: 'rgba(226, 153, 18, 0.9)',
            borderColor: 'rgba(178, 116, 0, 1)',
            pointBorderColor: 'rgba(25, 16, 0, 1)',
            order: 3,
            borderWidth: 0.5
          },
          {
            type: 'line',
            label: "BTC OPEN",
            data: payload.open,
            backgroundColor: 'rgba(10, 204, 0, 0.3)',
            borderColor: 'rgba(10, 204, 0, 1)',
            pointBorderColor: 'rgba(25, 16, 0, 1)',
            order: 2,
            borderWidth: 0.5
          },{
            type: 'line',
            label: "BTC HIGH",
            data: payload.high,
            backgroundColor:'rgba(22, 91, 160, 0.9)',
            borderColor: 'rgba(14, 38, 62,0.9)',
            pointBorderColor: 'rgba(22, 91, 160, 1)',
            order: 4 ,
            borderWidth: 0.5             
          },{
            type: 'line',
            label: "BTC LOW",
            data: payload.low,
            backgroundColor:'rgba(246, 239, 28, 0.48)',
            borderColor: 'rgba(255,255,0, 0.9)',
            pointBorderColor: 'rgba(255,255,0, 0.9)',
            order: 1,
            borderWidth: 0.5
          }],

       },

        }
         default: return state;
          }
         }
          export default bitcoinReducer;
      
