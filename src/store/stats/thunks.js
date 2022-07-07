import { getStats } from "../../services/stats";
import { failure, request, success } from "./actions";

export const importStats = () => async (dispatch, getState) => {
  dispatch(request());
  try {
    const statsData = await getStats();
    dispatch(success({ statsData: statsData }));
  } catch (err) {
    dispatch(failure({ errorMessage: err.errorMessage }));
  }
};
