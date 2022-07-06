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
import { format } from "date-fns";

import RangePicker from "../RangePicker";
import ReportCard from "../ReportCard/ReportCard";

import { getDataSum, getRangeData, getDateRangeString } from "../../utils";

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
              series={[
                {
                  name: getDateRangeString(secondRange),
                  data: secondRangeData.purchases.map((el) => ({
                    x: format(el.date, "D MMMM"),
                    y: el.value,
                  })),
                },
                {
                  name: getDateRangeString(firstRange),
                  data: firstRangeData.purchases.map((el) => ({
                    x: format(el.date, "D MMMM"),
                    y: el.value,
                  })),
                },
              ]}
            />
            {/* <ReportCard
              data={store.purchases}
              title="Баланс"
              periods={{ firstRange, secondRange }}
            />
            <ReportCard
              data={store.purchases}
              title="Просмотры → Клики"
              periods={{ firstRange, secondRange }}
            />
            <ReportCard
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
