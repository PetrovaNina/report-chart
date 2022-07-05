import { format } from "date-fns";

export const getDateRangeString = (
  { startDate, endDate },
  pattern = "D MMMM YYYY"
) => {
  const start = startDate && format(startDate, pattern);
  const end = endDate && format(endDate, pattern);

  return start && end
    ? format(startDate, "MM YYYY") === format(endDate, "MM YYYY")
      ? `${format(startDate, "D")}—${end}`
      : `${start}—${end}`
    : "";
};
