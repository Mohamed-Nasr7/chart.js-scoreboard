export const innings = (num) => {
  return {
    type: "NO_OF_INNINGS",
    payload: num,
  };
};

export const teamOne = (name) => {
  return {
    type: "TEAM_ONE_NAME",
    payload: name,
  };
};

export const teamTwo = (name) => {
  return {
    type: "TEAM_TWO_NAME",
    payload: name,
  };
};

export const teamStarts = (name) => {
  return {
    type: "TEAM_STARTS",
    payload: name,
  };
};

export const activeTeam = (active) => {
  return {
    type: "ACTIVE_CHART",
    payload: active,
  };
};

export const addFirstChartData = (data) => {
  return {
    type: "FIRST_CHART",
    payload: data,
  };
};

export const addSecondChartData = (data) => {
  return {
    type: "SECOND_CHART",
    payload: data,
  };
};
