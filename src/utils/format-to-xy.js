import { format } from "date-fns";
import { roundToDecimals } from "./round-to-decimals";

export const formatDataToXY = (data, metric, toCount = []) =>
  data.map((el) => ({
    x: format(el.date, "D MMMM YYYY"),
    y:
      metric && toCount.length
        ? roundToDecimals(metric(...toCount.map((param) => el[param])), 1)
        : el.value,
    view: el.view || null,
    click: el.click || null,
  }));
