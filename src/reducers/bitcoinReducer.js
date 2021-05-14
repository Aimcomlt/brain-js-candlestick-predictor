//Random color generator
//var r = () => Math.random() * 256 >> 0;
//var color = `rgb(${r()}, ${r()}, ${r()})`;

const initalState = {
  loading: false,
  data: {
    labels: [],
    datasets: [{
      label: "BTC close",
      data: [],
      backgroundColor: 'rgba(226, 153, 18, 0.9)',
      borderColor: 'rgba(178, 116, 0, 1)',
      pointBorderColor: 'rgba(25, 16, 0, 1)',

    }],
    
  },
  dataB: {
    labels: [],
    datasets: [{
      type: 'radar',
      label: "BOT CHART PREDICTION",
      data: [],
      backgroundColor: 'rgba(226, 153, 18, 0.9)',
      borderColor: 'rgba(178, 116, 0, 1)',
      pointBorderColor: 'rgba(25, 16, 0, 1)',
      options: {
        responsive: true
      }
    }]
  },
  dataC: {
    labels: [],
    datasets: [{
      type: 'bar',
      label: "BOT CHART PREDICTION",
      data: [],
      backgroundColor: 'rgba(226, 153, 18, 0.9)',
      borderColor: 'rgba(178, 116, 0, 1)',
      pointBorderColor: 'rgba(25, 16, 0, 1)',
      options: {
        responsive: true
      }
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
            order: 3
          },
          {
            type: 'line',
            label: "BTC OPEN",
            data: payload.open,
            backgroundColor: 'rgba(10, 204, 0, 0.3)',
            borderColor: 'rgba(10, 204, 0, 1)',
            pointBorderColor: 'rgba(25, 16, 0, 1)',
            order: 2
          },{
            type: 'line',
            label: "BTC HIGH",
            data: payload.high,
            backgroundColor:'rgba(22, 91, 160, 0.9)',
            borderColor: 'rgba(14, 38, 62,0.9)',
            pointBorderColor: 'rgba(22, 91, 160, 1)',
            order: 4               
          },{
            type: 'line',
            label: "BTC LOW",
            data: payload.low,
            backgroundColor:'rgba(233, 190, 0, 0.9)',
            borderColor: 'rgba(255,255,0, 0.9)',
            pointBorderColor: 'rgba(255,255,0, 0.9)',
            order: 1
          },]
        },
        dataB: {
          labels: ['OpenVsClose', 'Close Prediction', 'Open Prediction'],
          datasets: [{
            type: 'radar',
            label: "OPEN PRICE BRAIN PREDICTION",
            data: [payload.OpenBrainResult, payload.OpenBrainResult, payload.OpenBrainResult],// + (number + 1)],
            backgroundColor: 'rgba(255, 0, 0, 0.4)',
            borderColor: '	rgba(255, 0, 0, 0.9)',
            pointBorderColor: 'rgba(25, 16, 0, 1)',

            order: 1
            },
            {
            type: 'radar',
            label: "CLOSE PRICE BRAIN PREDICTION",
            data: [payload.CloseBrainResult, payload.CloseBrainResult, payload.CloseBrainResult],
            backgroundColor:'rgba(10, 204, 0, 0.7)',
            borderColor: 'rgba(10, 204, 0, 0.9)',
            pointBorderColor: 'rgba(10, 204, 0, 0.7)',

            order: 3
          },
          {
            type: 'radar',
            label: "HIGH PRICE BRAIN PREDICTION",
            data: [payload.HighBrainResult, payload.HighBrainResult, payload.HighBrainResult],
            backgroundColor:'rgba(0,0,255, 0.7)',
            borderColor: 'rgba(0,0,255, 0.9)',
            pointBorderColor: 'rgba(0,0,255, 0.8)',

            order: 3
          },
          {
            type: 'radar',
            label: "LOW PRICE BRAIN PREDICTION",
            data: [payload.LowBrainResult, payload.LowBrainResult, payload.LowBrainResult],
            backgroundColor:'rgba(255,255,0, 0.8)',
            borderColor: 'rgba(255,255,0, 0.9)',
            pointBorderColor: 'rgba(255,255,0, 0.9)',

            order: 3
          }]
          },
           dataC: {
            labels: ['Close Prediction', 'Open Prediction'],
            datasets: [{
              type: 'bar',
              label: "Close - Open",
              data: [payload.CloseBrainResult - payload.OpenBrainResult],
              backgroundColor: 'rgba(226, 153, 18, 0.9)',
              borderColor: 'rgba(178, 116, 0, 1)',
              pointBorderColor: 'rgba(25, 16, 0, 1)',
              order: 2
            },
            {
              type: 'bar',
              label: "Open - Close",
              data: [payload.OpenBrainResult - payload.CloseBrainResult],
              backgroundColor: 'rgba(10, 204, 0, 0.8)',
              borderColor: 'rgba(10, 204, 0, 0.9)',
              pointBorderColor: 'rgba(25, 16, 0, 0.8)',
              order: 3
            }]
            },
              options:{
                responsive : true
             }
          }
    default:
      return state;
  }
  
}
export default bitcoinReducer;
