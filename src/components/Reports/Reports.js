import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";

import cn from "classnames";

import RangePicker from "../RangePicker";
import ReportCard from "../ReportCard/ReportCard";

import {
  getDataSum,
  getRangeData,
  getDateRangeString,
  formatDataToXY,
  clickThroughRate,
} from "../../utils";

import { importStats } from "../../store/stats/thunks";
import { getStatsData } from "../../store/stats/actions";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: "1120px",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
  },
  box: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
    alignItems: "center",
  },
  gap16: { gap: "16px" },
  justifyRight: {
    justifyContent: "right",
  },
  font14: {
    fontFamily: "inherit",
    fontSize: 14,
    lineHeight: 1,
  },
}));

const Reports = () => {
  const dispatch = useDispatch();
  const { statsData } = useSelector(getStatsData);

  const { container, box, gap16, justifyRight, font14 } = useStyles();
  const center = useMediaQuery("(max-width:1061px)");

  const theme = useTheme();
  const grey600 = theme.palette.grey[600];

  const [firstRange, setFirstRange] = useState({});
  const [secondRange, setSecondRange] = useState({});

  const [firstRangeData, setFirstRangeData] = useState(null);
  const [secondRangeData, setSecondRangeData] = useState(null);

  const getDateSeries = (key, cb, params = []) => [
    {
      name: getDateRangeString(secondRange),
      data: formatDataToXY(secondRangeData[key], cb, params),
    },
    {
      name: getDateRangeString(firstRange),
      data: formatDataToXY(firstRangeData[key], cb, params),
    },
  ];

  class Conversion {
    constructor(data, cb, [first, second]) {
      this.firstSum = getDataSum(data, first);
      this.secondSum = getDataSum(data, second);
      this.conversion = cb(this.firstSum, this.secondSum);
    }
  }

  useEffect(() => {
    dispatch(importStats());
  }, []);

  useEffect(() => {
    firstRange.endDate &&
      setFirstRangeData(getRangeData(statsData, firstRange));
  }, [firstRange]);

  useEffect(() => {
    secondRange.endDate &&
      setSecondRangeData(getRangeData(statsData, secondRange));
  }, [secondRange]);

  const prefix = {
    rub: "₽",
    percent: "%",
  };

  return (
    <Container fixed className={cn(container, gap16)}>
      <Typography variant="h4" align="center">
        Select periods for comparison to see statistics
      </Typography>
      <Box
        className={cn(box, gap16, font14, {
          [justifyRight]: !center,
        })}
        color={grey600}
      >
        {statsData && (
          <>
            <RangePicker
              placeholder="First period"
              dateRange={firstRange}
              setDateRange={setFirstRange}
            />
            <Typography
              variant="body2"
              style={{
                paddingBottom: "2px",
              }}
            >
              vs
            </Typography>
            <RangePicker
              placeholder="Second period"
              dateRange={secondRange}
              setDateRange={setSecondRange}
            />
          </>
        )}
      </Box>
      <Box className={box}>
        {firstRangeData && secondRangeData && (
          <>
            <ReportCard
              cardName="Продажи"
              majorText={[
                getDataSum(secondRangeData.purchases, "value"),
                prefix.rub,
              ]}
              minorText={getDataSum(firstRangeData.purchases, "value")}
              withPercent={true}
              withLegend={true}
              ranges={[secondRange, firstRange]}
              series={getDateSeries("purchases")}
            />
            <ReportCard
              cardName="Баланс"
              majorText={[
                getDataSum(secondRangeData.purchases, "value") * 2.5,
                prefix.rub,
              ]}
              minorText={getDataSum(firstRangeData.purchases, "value") * 1.5}
              withPercent={true}
              ranges={[secondRange, firstRange]}
              series={getDateSeries("purchases")}
            />
            {(() => {
              const left = new Conversion(
                secondRangeData.views_to_clicks,
                clickThroughRate,
                ["view", "click"]
              );
              const right = new Conversion(
                firstRangeData.views_to_clicks,
                clickThroughRate,
                ["view", "click"]
              );
              return (
                <ReportCard
                  cardName="Просмотры → Клики"
                  majorText={[Math.round(left.conversion), prefix.percent]}
                  captions={{
                    left: [left.firstSum, left.secondSum],
                    right: [right.firstSum, right.secondSum],
                  }}
                  ranges={[secondRange, firstRange]}
                  series={getDateSeries("views_to_clicks", clickThroughRate, [
                    "view",
                    "click",
                  ])}
                />
              );
            })()}

            {(() => {
              const left = new Conversion(
                secondRangeData.views_to_clicks,
                clickThroughRate,
                ["view", "click"]
              );
              const right = new Conversion(
                firstRangeData.views_to_clicks,
                clickThroughRate,
                ["view", "click"]
              );
              const pseudoPurchaseLeft = Math.round(left.secondSum / 15);
              const pseudoPurchaseRight = Math.round(right.secondSum / 15);
              return (
                <ReportCard
                  cardName="Клики → Продажи"
                  majorText={[
                    Math.round(
                      clickThroughRate(left.secondSum, pseudoPurchaseLeft)
                    ),
                    prefix.percent,
                  ]}
                  captions={{
                    left: [left.secondSum, pseudoPurchaseLeft],
                    right: [right.secondSum, pseudoPurchaseRight],
                  }}
                  ranges={[secondRange, firstRange]}
                  series={getDateSeries("views_to_clicks", clickThroughRate, [
                    "view",
                    "click",
                  ])}
                />
              );
            })()}
          </>
        )}
      </Box>
    </Container>
  );
};

export default Reports;
