import { request, success, failure } from "./actions";
import { mockedStats } from "./mockedStats";
import { statsReducer, INITIAL_STATE } from "./reducer";

const REQUEST_STATE = {
  errorMessage: "",
  statsData: {},
  isLoading: true,
};

const SUCCESS_STATE = {
  errorMessage: "",
  statsData: mockedStats,
  isLoading: false,
};

const FAILURE_STATE = {
  errorMessage: "error message",
  statsData: {},
  isLoading: false,
};

describe("stats reducer", () => {
  it("should return the initital state", () => {
    expect(statsReducer(INITIAL_STATE, request())).toEqual(REQUEST_STATE);
  });

  it("should return state with stats if fetched successfully", () => {
    expect(
      statsReducer(INITIAL_STATE, success({ statsData: mockedStats }))
    ).toEqual(SUCCESS_STATE);
  });

  it("should return state with error message if fetched failed", () => {
    expect(
      statsReducer(INITIAL_STATE, failure({ errorMessage: "error message" }))
    ).toEqual(FAILURE_STATE);
  });
});
