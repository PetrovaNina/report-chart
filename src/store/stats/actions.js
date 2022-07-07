export const getStatsData = (state) => state.stats;

export const request = (payload) => ({
  type: "STATS_REQUEST_DATA",
  payload,
});

export const success = (payload) => ({
  type: "STATS_SUCCESS_DATA",
  payload,
});

export const failure = (payload) => ({
  type: "STATS_FAILURE_DATA",
  payload,
});
