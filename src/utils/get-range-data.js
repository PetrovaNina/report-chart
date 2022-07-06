import { isAfter, isBefore, isEqual } from "date-fns";

export const getRangeData = (data, period) => {
  return Object.entries(data).reduce((acc, cur) => {
    acc[cur[0]] = cur[1].filter(
      ({ date }) =>
        (isAfter(date, period.startDate) || isEqual(date, period.startDate)) &&
        (isBefore(date, period.endDate) || isEqual(date, period.endDate))
    );
    return acc;
  }, {});
};
