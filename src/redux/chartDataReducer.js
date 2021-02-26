const initState = {
  chartOne: [{}],
  chartTwo: [{}],
};

const chartDataReducer = (state = initState, action) => {
  switch (action.type) {
    case "FIRST_CHART":
      return {
        ...state,
        chartOne: action.payload,
      };

    case "SECOND_CHART":
      return {
        ...state,
        chartTwo: action.payload,
      };

    default:
      return state;
  }
};

export default chartDataReducer;
