import React from "react";
import {
  Card,
  Grid,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";

import Chart from "react-apexcharts";
import { format } from "date-fns";
import cn from "classnames";

import chartFormat from "./chart-format";
import { roundToDecimals } from "../../utils";

const useStyles = makeStyles(() => ({
  percent: {
    backgroundColor: "rgba(154, 255, 158, 0.5)",
    display: "inline-block",
    justifySelf: "flex-start",
    padding: "0 4px",
    borderRadius: "4px",
  },
  negative: {
    backgroundColor: "rgba(255, 113, 84, 0.5);",
  },
}));

const ReportCard = ({
  cardName,
  majorText,
  minorText = [],
  captures = {},
  withPercent = false,
  withLegend = false,
  series,
  ranges,
}) => {
  const { percent, negative } = useStyles();
  const [firstPeriod, secondPeriod] = series;
  const { startDate, endDate } = ranges[1];

  const percentage = (majorText[0] - minorText[0]) / minorText[0];
  const percentageText = !withPercent
    ? false
    : percentage >= 1
    ? Math.round(percentage)
    : roundToDecimals(percentage, 1);

  const theme = useTheme();

  const grey600 = theme.palette.grey[600];
  const grey300 = theme.palette.grey[300];

  return (
    <Card
      style={{
        position: "relative",
        border: `1px solid ${grey300}`,
        maxWidth: "512px",
        flex: "1 1 450px",
        padding: "16px 16px 0 16px",
        borderRadius: "8px",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      {!firstPeriod.data && !secondPeriod.data ? (
        <Typography variant="caption">{`Нет данных в категории "${cardName}" за указанный период`}</Typography>
      ) : (
        <>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h5">{cardName}</Typography>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{ gap: "8px" }}
            >
              <Typography variant="h4">{majorText}</Typography>
              {!!percentageText && (
                <Typography
                  variant="caption"
                  className={cn(percent, { [negative]: percentage < 0 })}
                >
                  {percentageText + "%"}
                </Typography>
              )}
              <Typography
                variant="caption"
                style={{ flexGrow: 1, textAlign: "end" }}
              >
                {minorText}
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="caption">{captures.left}</Typography>
              <Typography variant="caption" style={{ color: grey600 }}>
                {captures.right}
              </Typography>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{
                position: "absolute",
                width: "calc(100% - 32px)",
                bottom: "16px",
                color: grey600,
              }}
            >
              <Typography variant="caption">
                {format(startDate, "D MMMM YYYY")}
              </Typography>
              <Typography variant="caption">
                {format(endDate, "D MMMM YYYY")}
              </Typography>
            </Grid>
          </Grid>
          <Grid item style={{ overflow: "hidden" }}>
            <Chart
              {...chartFormat(theme.palette, series, withLegend)}
              style={{ margin: "0 -4px" }}
            />
          </Grid>
        </>
      )}
    </Card>
  );
};

export default ReportCard;
