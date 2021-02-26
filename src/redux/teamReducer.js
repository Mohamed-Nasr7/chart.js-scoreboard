const initState = {
  numberOfInnings: 0,
  teamOne: "",
  teamTwo: "",
  startTeam: "home",
  activeChart: 1,
};

const teamReducer = (state = initState, action) => {
  switch (action.type) {
    case "NO_OF_INNINGS":
      return {
        ...state,
        numberOfInnings: action.payload,
      };

    case "TEAM_ONE_NAME":
      return {
        ...state,
        teamOne: action.payload,
      };

    case "TEAM_TWO_NAME":
      return {
        ...state,
        teamTwo: action.payload,
      };

    case "TEAM_STARTS":
      return {
        ...state,
        startTeam: action.payload,
      };

    case "ACTIVE_CHART":
      return {
        ...state,
        activeChart: action.payload,
      };

    default:
      return state;
  }
};

export default teamReducer;
