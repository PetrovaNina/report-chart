import { useEffect, useState } from "react";
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
  getIncrease,
} from "../../utils";

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
  const { container, box, gap16, justifyRight, font14 } = useStyles();
  const center = useMediaQuery("(max-width:1061px)");

  const theme = useTheme();
  const grey600 = theme.palette.grey[600];

  const [store, setStore] = useState(null);
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

  class Convercion {
    constructor(data, cb, [first, second]) {
      this.firstSum = getDataSum(data, first);
      this.secondSum = getDataSum(data, second);
      this.conversion = cb(this.firstSum, this.secondSum);
    }
  }

  useEffect(() => {
    fetch("https://wegotrip.com/api/v2/stats/plot")
      .then((res) => res.json())
      .then((json) => {
        setStore(json);
      });
  }, []);

  useEffect(() => {
    firstRange.endDate && setFirstRangeData(getRangeData(store, firstRange));
  }, [firstRange]);

  useEffect(() => {
    secondRange.endDate && setSecondRangeData(getRangeData(store, secondRange));
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
        {store && (
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
              minorText={[
                getDataSum(firstRangeData.purchases, "value"),
                prefix.rub,
              ]}
              withPercent={true}
              withLegend={true}
              ranges={[secondRange, firstRange]}
              series={getDateSeries("purchases")}
            />
            {/* <ReportCard
              data={store.purchases}
              title="Баланс"
              periods={{ firstRange, secondRange }}
            />*/}
            {(() => {
              const left = new Convercion(
                secondRangeData.views_to_clicks,
                clickThroughRate,
                ["view", "click"]
              );
              const right = new Convercion(
                firstRangeData.views_to_clicks,
                clickThroughRate,
                ["view", "click"]
              );
              return (
                <ReportCard
                  cardName="Просмотры → Клики"
                  majorText={[Math.round(left.conversion), prefix.percent]}
                  captures={{
                    left: `${left.firstSum} → ${left.secondSum}`,
                    right: `${right.firstSum} → ${right.secondSum}`,
                  }}
                  ranges={[secondRange, firstRange]}
                  series={getDateSeries("views_to_clicks", clickThroughRate, [
                    "view",
                    "click",
                  ])}
                />
              );
            })()}
            {/*<ReportCard
              data={store.purchases}
              title="Клики → Продажи"
              periods={{ firstRange, secondRange }}
            /> */}
          </>
        )}
      </Box>
    </Container>
  );
};

export default Reports;
