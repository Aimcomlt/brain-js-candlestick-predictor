

const initalState = {
    Loading: false,
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
    },
    dataD: {
        labels: [],
        datasets: [{
          type: 'line',
          label: "Real Time vs Open Prediction",
          data: [],
          backgroundColor: 'rgba(226, 153, 18, 0.9)',
          borderColor: 'rgba(178, 116, 0, 1)',
          pointBorderColor: 'rgba(25, 16, 0, 1)',
          options: {
            scales: {
                x: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
        }],
      },

}
const brainReducer = (state = initalState, action) => {
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
              /*  dataB: {
                  labels: 'OpenBrainResult',
                  datasets: [
                    {
                    type: 'radar',
                    label: "OPEN PRICE BRAIN PREDICTION",
                    data: payload.OpenBrainResult[0],// + (number + 1)],
                    backgroundColor: 'rgba(255, 0, 0, 0.4)',
                    borderColor: '	rgba(255, 0, 0, 0.9)',
                    pointBorderColor: 'rgba(25, 16, 0, 1)',
        
                    order: 1
                    },
                    {
                    type: 'radar',
                    label: "CLOSE PRICE BRAIN PREDICTION",
                    data: payload.CloseBrainResult,
                    backgroundColor:'rgba(10, 204, 0, 0.7)',
                    borderColor: 'rgba(10, 204, 0, 0.9)',
                    pointBorderColor: 'rgba(10, 204, 0, 0.7)',
        
                    order: 2
                    },
                    {
                    type: 'radar',
                    label: "HIGH PRICE BRAIN PREDICTION",
                    data: payload.HighBrainResult, 
                    backgroundColor:'rgba(0,0,255, 0.7)',
                    borderColor: 'rgba(0,0,255, 0.9)',
                    pointBorderColor: 'rgba(0,0,255, 0.8)',
        
                    order: 3
                    },
                    {
                    type: 'radar',
                    label: "LOW PRICE BRAIN PREDICTION",
                    data: payload.LowBrainResult,
                    backgroundColor:'rgba(255,255,0, 0.8)',
                    borderColor: 'rgba(255,255,0, 0.9)',
                    pointBorderColor: 'rgba(255,255,0, 0.9)',
        
                    order: 4
                    }]
                  },*/
                dataD: {
                      labels: payload.laBox,
                      datasets: [{
                        type: "line",
                        label: "REAL TIME OPEN" ,
                        data: payload.opVS,
                        backgroundColor: 'rgb(0, 0, 0, 0.6)',
                        borderColor: 'rgb(0, 0, 0)',
                        pointBorderColor: 'rgb(0, 0, 0)',
                        order: 1,
                      },
                      {
                        type: 'line',
                        label: "PREDICTED OPEN",
                        data: payload.brOP,
                        backgroundColor: 'rgba(255, 0, 0, 0.4)',
                        borderColor: 'rgba(255, 0, 0, 0.9)',
                        pointBorderColor: 'rgba(25, 16, 0, 1)',
                        order: 3,
                      },
                      {
                        type: 'line',
                        label: "PREDICTED CLOSE",
                        data: payload.clVS,
                        backgroundColor: 'rgba(0,0,255, 0.4)',
                        borderColor: '	rgba(0,0,255, 0.9)',
                        pointBorderColor: 'rgba(0,0,255, 1)',
                        order: 2,
                      },
                      {
                        type: 'line',
                        label: "PREDICTED HIGH",
                        data: payload.hghVS,
                        backgroundColor: 'rgba(22, 91, 160, 0.7)',
                        borderColor: '	rgba(22, 91, 160, 0.9)',
                        pointBorderColor: 'rgba(22, 91, 160, 1)',
                        order: 4,
                      },
                      {
                        type: 'line',
                        label: "PREDICTED LOW",
                        data: payload.lowVS,
                        backgroundColor: 'rgba(255, 255, 0, 0.7)',
                        borderColor: 'rgba(255, 255, 0, 0.9)',
                        pointBorderColor: 'rgba(255, 255, 0, 1)',
                        order: 5,
                      },
                      {
                        type: 'line',
                        label: "All 4 PREDICTED MOVING AVERAGE",
                        data: payload.midOP,
                        backgroundColor: 'rgba(255, 113, 16, 0.7)',
                        borderColor: 'rgba(255, 113, 16, 0.9)',
                        pointBorderColor: 'rgba(255, 113, 16, 0.9)',
                        order: 6,
                      },
                    ]
                  },
                  dataC: {
                    labels: ['Real price vs Predicted price'],
                    datasets: [
                      {
                      type: 'bar',
                      label: "Real Time vs Predicted Open ",
                      data: payload.RvsPredicted,
                      backgroundColor: 'rgb(0, 0, 0, 0.6)',
                      borderColor: 'rgb(0, 0, 0)',
                      pointBorderColor: 'rgb(0, 0, 0)',
                      order: 1
                      },            
                      {
                      type: 'bar',
                      label: "Predicted Open vs Real Time",
                      data: payload.PvsReal,
                      backgroundColor: 'rgba(255, 0, 0, 0.9)',//red
                      borderColor: 'rgba(255, 0, 0, 0.9)',
                      pointBorderColor: 'rgba(255, 0, 0, 0.9)',
                      order: 2
                      },
                      {
                      type: 'bar',
                      label: "Real Close vs Predicted Close",
                      data: payload.ClsPredicted,
                      backgroundColor:'rgba(0,0, 0, 0.7)',
                      borderColor: 'rgba(0, 0, 0, 0.9)',
                      pointBorderColor: 'rgba(0, 0, 0, 0.7)',
                      order: 3
                      },
                      {
                      type: 'bar',
                      label: "Predicted Close vs Real Close",
                      data: payload.RealClose,
                      backgroundColor: 'rgba(10, 204, 0, 0.9)',
                      borderColor: 'rgba(10, 204, 0, 0.9)',
                      pointBorderColor: 'rgba(10, 204, 0, 0.9)',
                      order: 4
                      },
                      {
                      type: 'bar',
                      label: "Real High vs Predicted High",
                      data: payload.RealHigh,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      borderColor: 'rgba(0, 0, 0, 0.6)',
                      pointBorderColor: 'rgba(0, 0, 0, 1)',
                      order: 5
                      },
                      {
                      type: 'bar',
                      label: "Predicted High vs Real High",
                      data: payload.HghPredicted,
                      backgroundColor: 'rgba(22, 91, 160, 0.9)', //blue
                      borderColor: 'rgba(22, 91, 160, 0.9)',
                      pointBorderColor: 'rgba(22, 91, 160, 0.9)',
                      order: 6
                      },
                      {
                      type: 'bar',
                      label: "Real Low vs Predicted Low",
                      data: payload.RealLow,
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      borderColor: 'rgba(0, 0, 0, 0.9)',
                      pointBorderColor: 'rgba(0, 0, 0, 0.9)',
                      order: 7
                      },
                      {
                      type: 'bar',
                      label: "Predicted Low vs Real Low",
                      data: payload.LowPredicted,
                      backgroundColor: 'rgba(255, 255, 0, 0.9)',
                      borderColor: 'rgba(255, 255, 0, 0.9)',
                      pointBorderColor: 'rgba(255, 255, 0, 0.9)',
                      order: 8
                      }
]
                   }
                }
                 default: return state;
                }
             }
             export default brainReducer;
