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
import { getIncrease, roundToDecimals } from "../../utils";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    border: `1px solid ${theme.palette.grey[300]}`,
    maxWidth: "512px",
    flex: "1 1 450px",
    padding: "16px 16px 0 16px",
    borderRadius: "8px",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    overflow: "initial",
  },
  percent: {
    backgroundColor: theme.palette.semiGreen,
    display: "inline-block",
    justifySelf: "flex-start",
    padding: "0 4px",
    borderRadius: "4px",
  },
  negative: {
    backgroundColor: theme.palette.semiRed,
  },

  containerCenter: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  absoluteCaption: {
    position: "absolute",
    width: "calc(100% - 32px)",
    bottom: "16px",
    color: theme.palette.grey600,
  },
}));

const ReportCard = ({
  cardName,
  majorText = [],
  minorText = [],
  captures = {},
  withPercent = false,
  withLegend = false,
  series,
  ranges,
}) => {
  const s = useStyles();
  const { startDate, endDate } = ranges[0];

  const percentage = getIncrease(majorText[0], minorText[0]);
  const percentageText = !withPercent
    ? false
    : percentage >= 1
    ? Math.round(percentage)
    : roundToDecimals(percentage, 1);

  const theme = useTheme();

  return (
    <Card className={s.card}>
      {!series[0].data.length || !series[1].data.length ? (
        <Typography
          variant="caption"
          style={{ paddingBottom: "16px" }}
        >{`Невозможно провести сравнение в категории "${cardName}". В одном или обоих периодах нет данных.`}</Typography>
      ) : (
        <>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h5">{cardName}</Typography>
            </Grid>
            <Grid
              container
              className={s.containerCenter}
              style={{ gap: "8px" }}
            >
              <Typography
                variant="h4"
                style={{
                  color: `${
                    withLegend && theme.palette.darkBlue
                  }`,
                }}
              >
                {majorText}
              </Typography>
              {!!percentageText && (
                <Typography
                  variant="caption"
                  className={cn(s.percent, { [s.negative]: percentage < 0 })}
                >
                  {percentageText + "%"}
                </Typography>
              )}
              <Typography
                variant="caption"
                style={{
                  flexGrow: 1,
                  textAlign: "end",
                  color: `${
                    withLegend ? theme.palette.blueText : theme.palette.grey600 
                  }`,
                }}
              >
                {minorText}
              </Typography>
            </Grid>
            <Grid container className={s.containerCenter}>
              <Typography variant="caption">{captures.left}</Typography>
              <Typography variant="caption">{captures.right}</Typography>
            </Grid>
            <Grid
              container
              className={cn(s.absoluteCaption, s.containerCenter)}
            >
              <Typography variant="caption">
                {format(startDate, "D MMMM YYYY")}
              </Typography>
              <Typography variant="caption">
                {format(endDate, "D MMMM YYYY")}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Chart
              {...chartFormat(theme.palette, series, withLegend, majorText[1])}
              style={{ margin: "0 -4px" }}
            />
          </Grid>
        </>
      )}
    </Card>
  );
};

export default ReportCard;
