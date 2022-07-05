const chartFormat = (colors) => ({
  height: 168,
  type: "bar",
  width: "100%",
  options: {
    colors: ["#0B79D0", "rgba(33, 150, 243, 0.5)"],
    fill: {
      colors: ["#64B6F7", "#2196F320"],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "90%",
        barHeight: "100%",
      },
    },
    chart: {
      id: "bar-chart",
      offsetX: 0,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      type: "category",
      axisBorder: {
        show: true,
        color: colors.grey[400],
        height: 2,
        width: "100%",
      },
    },
    yaxis: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: -8,
      },
    },
    legend: {
      fontSize: "inherit",
      fontFamily: "inherit",
      fontWeight: "inherit",
      labels: {
        colors: colors.grey[600],
      },
      markers: {
        width: 4,
        height: 4,
        radius: 4,
        offsetX: -2,
      },
      itemMargin: {
        horizontal: 9,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: false,
      },
      onItemHover: {
        highlightDataSeries: false,
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            offsetY: -16,
          },
          legend: {
            position: "top",
            offsetY: 16,
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      // x: {
      //   // show: false,
      // },
      // y: {
      //   // format: "dd MMM",
      //   title: {
      //     formatter: function (
      //       value,
      //       { series, seriesIndex, dataPointIndex, w }
      //     ) {
      //       return (
      //         ", seriesIndex:" +
      //         seriesIndex +
      //         ", dataPointIndex:" +
      //         series[dataPointIndex]
      //       );
          // },
        // },
      // },
    },
  },
  series: [
    {
      name: "1 - 30 июня 2022",
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
    },
    {
      name: "1 - 30 июля 2022",
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
    },
  ],
});
export default chartFormat;
