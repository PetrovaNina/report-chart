export const INITIAL_STATE = {
  isLoading: true,
  statsData: {},
  errorMessage: "",
};

export const statsReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case "STATS_REQUEST_DATA":
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };

    case "STATS_SUCCESS_DATA":
      return {
        ...state,
        isLoading: false,
        statsData: payload.statsData,
      };

    case "STATS_FAILURE_DATA":
      return {
        ...state,
        errorMessage: payload.errorMessage,
        isLoading: false,
      };

    default:
      return state;
  }
};
