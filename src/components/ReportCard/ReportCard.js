import React from "react";
import { Card, Grid, Typography, useTheme } from "@material-ui/core";

import Chart from "react-apexcharts";
import chartFormat from "./chart-format";

const BarChart = ({ isLoading }) => {
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
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h5">Продажи</Typography>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ gap: "8px" }}
        >
          <Typography variant="h4">2 324₽</Typography>
          <Typography variant="caption">15%</Typography>
          <Typography
            variant="caption"
            style={{ flexGrow: 1, textAlign: "end" }}
          >
            824₽
          </Typography>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="caption">1235 → 798</Typography>
          <Typography variant="caption" style={{ color: grey600 }}>
            235 → 98
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
          <Typography variant="caption">30 июня 2022</Typography>
          <Typography variant="caption">30 июля 2021</Typography>
        </Grid>
      </Grid>
      <Grid item style={{ overflow: "hidden" }}>
        <Chart {...chartFormat(theme.palette)} style={{ margin: "0 -4px" }} />
      </Grid>
    </Card>
  );
};

export default BarChart;
