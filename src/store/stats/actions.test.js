import createMockStore from "redux-mock-store";
import { request, success, failure } from "./actions";

const mockedStore = createMockStore()();
describe("Event actions", () => {
  it("should create action to request data", () => {
    mockedStore.dispatch(request());
    expect(mockedStore.getActions()).toEqual([{ type: "STATS_REQUEST_DATA" }]);
  });

  it("should create action to success data", () => {
    const statsData = [];
    mockedStore.dispatch(success({ statsData }));
    expect(mockedStore.getActions()).toEqual([
      { type: "STATS_SUCCESS_DATA", payload: { statsData } },
    ]);
  });

  it("should create action to failure data", () => {
    mockedStore.dispatch(failure({ errorMessage: "default error" }));
    expect(mockedStore.getActions()).toEqual([
      {
        type: "STATS_FAILURE_DATA",
        payload: { errorMessage: "default error" },
      },
    ]);
  });

  afterEach(() => {
    mockedStore.clearActions();
  });
});
