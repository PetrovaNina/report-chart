const chartFormat = (colors, series, withLegend, prefix) => ({
  height: 168,
  type: "bar",
  width: "100%",
  options: {
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
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
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "category",
      labels: {
        show: false,
        format: "D MMM",
      },
      axisTicks: { show: false },
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
        right: 2,
        bottom: 0,
        left: 2,
      },
    },
    legend: {
      show: withLegend,
      floating: true,
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
      custom: function ({ dataPointIndex, w }) {
        const segment1 = w.config.series[0].data[dataPointIndex];
        const segment2 = w.config.series[1].data[dataPointIndex];

        const main = (segment, color) => `<div>
        <span style="color: ${color}">${segment.x}</span>
        <p>${segment.y}${prefix}</p>
        ${additional(segment)}
        </div>
        `;

        const additional = (segment) =>
          segment.view && segment.click
            ? `<span>View: ${segment.view}</span><br>
              <span>Click: ${segment.click}</span><br>`
            : "";

        return `${segment1 ? main(segment1, "#0B79D0") : ""} ${
          segment2 ? main(segment2, "#80beff") : ""
        }`;
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (val, { seriesIndex, dataPointIndex, w }) {
            return `${
              w.globals.seriesX[seriesIndex][dataPointIndex]
            } ${val.slice(-4)}`;
          },
        },
      },
      marker: {
        show: false,
      },
    },
  },
  series: series,
});
export default chartFormat;
