import React, { useRef, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useChart from "./useChart";
import { useMediaQuery } from "react-responsive";
import "./style.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Moment from "react-moment";

const dummyTemplate = [
  { name: "Played", value: "3 days ago", color: "#fff" },
  { name: "Wager", value: "1.00 bits", color: "#fff" },
  { name: "Target", value: "2.34x", color: "#16ff63" },
  { name: "Multiplier", value: "2.84x", color: "#fff" },
  { name: "Bet Profit", value: "2.34x", color: "#16ff63" },
  { name: "Net Profit", value: "2.84x", color: "#fff" },
];
export default function Chart({ bets }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
  );
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);

  const tooltipRef = useRef();
  const [tooltipLoading, setTooltipLoading] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    const X_profits = [];
    const Y_labels = [];
    let totalProfit = 0;
    for (let i = 0; i < bets.length; i++) {
      totalProfit = totalProfit + parseFloat(bets[i].profit_usd);
      bets[i].netProfit_usd = totalProfit;
      X_profits.push(totalProfit);
      Y_labels.push(i);
    }
    setLabels(Y_labels);
    setChartData(X_profits);
  }, [bets]);


  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.className = "custom-tooltip";

      const container = document.createElement("div");
      const header = document.createElement("div");
      header.className = "tooltip-header";

      const title = document.createElement("b");
      title.textContent = "Bet#8";
      title.className = "bet-title";

      const mutedId = document.createElement("span");
      mutedId.className = "mutedId";
      mutedId.textContent = "#" + activeTooltip.id;

      header.appendChild(title);
      header.appendChild(mutedId);

      const stats = document.createElement("div");
      stats.className = "tooltip-stats";

      dummyTemplate.forEach((item) => {
        let row = document.createElement("div");
        row.className = "items-row";

        let name = document.createElement("span");
        let value = document.createElement("span");
        name.textContent = item.name;
        value.textContent = activeTooltip.profit;

        value.style.color = item.color;
        name.style.fontWeight = "300";

        row.appendChild(name);
        row.appendChild(value);
        stats.appendChild(row);
      });

      container.appendChild(header);
      container.appendChild(stats);
      tooltipEl.appendChild(container);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  const sampleData = (canvas) => {
    let width, height, gradient;
    function getGradient(ctx, chartArea) {
      const chartWidth = chartArea.right - chartArea.left;
      const chartHeight = chartArea.bottom - chartArea.top;
      if (gradient === null || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );
        gradient.addColorStop(0.5, "rgba(255, 104, 22, 0.150)");
        gradient.addColorStop(0.4, "rgba(255, 104, 22, 0.100)");
        gradient.addColorStop(0.2, "rgba(255, 104, 22, 0.040)");
      }

      return gradient;
    }

    return {
      labels,
      datasets: [
        {
          data: chartData,
          tension: 0,
          pointStyle: "circle",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 13,
          pointHoverBorderColor: "#FF9900",
          borderWidth: 1.2,
          borderColor: "#fff",
          fill: "start",
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return null;
            }
            return getGradient(ctx, chartArea);
          },
        },
      ],
    };
  };

  return (
    <div className="chart">
      <div
        ref={tooltipRef}
        className="custom-tooltip"
        style={{ opacity: 0, left: "0", top: "0" }}
      >
        {activeTooltip && (
          <div>
            <div className="tooltip-header">
              <b className="bet-title">Bet</b>
              <span className="mutedId">#{activeTooltip.id}</span>
            </div>
            <div className="tooltip-stats">
              {tooltipLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <div className="items-row">
                    <span style={{ fontWeight: 300 }}>Played</span>
                    <span style={{ color: "rgb(255, 255, 255)" }}>
                      {" "}
                      <Moment date={activeTooltip.createdAt} fromNow />
                    </span>
                  </div>
                  <div className="items-row">
                    <span style={{ fontWeight: 300 }}>
                      Wager({activeTooltip.asset_code.toUpperCase()})
                    </span>
                    <span style={{ color: "rgb(255, 255, 255)" }}>
                    {(activeTooltip.wager_usd).toLocaleString("en", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}$
                    </span>
                  </div>
                  <div className="items-row">
                    <span style={{ fontWeight: 300 }}>Target</span>
                    <span style={{ color: "rgb(255, 255, 255)" }}>
                      {(activeTooltip.target / 100).toLocaleString("en", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="items-row">
                    <span style={{ fontWeight: 300 }}>Multiplier</span>
                    <span style={{ color: "rgb(255, 255, 255)" }}>
                      {(activeTooltip.multiplier / 100).toLocaleString("en", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="items-row">
                    <span style={{ fontWeight: 300 }}>Bet Profit</span>
                    <span style={{ color: "rgb(255, 255, 255)" }}>
                    {parseFloat(activeTooltip.profit_usd).toLocaleString("en", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}$

                    </span>
                  </div>
                  <div className="items-row">
                    <span style={{ fontWeight: 300 }}>Net Profit</span>
                    <span style={{ color: "rgb(255, 255, 255)" }}>
                    {parseFloat(activeTooltip.netProfit_usd).toLocaleString("en", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}$
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Line
        data={sampleData()}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                callback: (value, index, ticks) => {
                  return value + "$";
                },
                precision: 0,
                color: ({ tick }) => {
                  return tick.value === 0
                    ? "rgba(255, 104, 22, 0.7)"
                    : "rgba(255, 255, 255, 0.7)";
                },
                backdropPadding: 5,
                font: {
                  size: isMobile ? 11 : isTablet ? 14 : 16,
                },
              },
              grid: {
                color: ({ tick }) => {
                  return tick.value === 0
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(255, 255, 255, 0.08)";
                },
                borderColor: "rgba(255, 255, 255, 0.2)",
                borderDash: [10, 5],
                lineWidth: 1.5,
              },
            },
            x: {
              grid: {
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.7)",
                font: {
                  size: isMobile ? 11 : isTablet ? 14 : 16,
                },
              },
            },
          },
          plugins: {
            tooltip: {
              // Disable the on-canvas tooltip
              enabled: false,

              external: function (context) {
                // Tooltip Element
                const { chart, tooltip } = context;
                const tooltipEl = getOrCreateTooltip(chart, activeTooltip);

                // Hide if no tooltip
                if (tooltip.opacity === 0) {
                  tooltipEl.style.opacity = 0;
                  return;
                }

                const { offsetLeft: positionX, offsetTop: positionY } =
                  chart.canvas;

                tooltipEl.style.opacity = 1;
                tooltipEl.style.left = positionX + tooltip.caretX + "px";
                tooltipEl.style.top = positionY + tooltip.caretY + "px";
                tooltipEl.style.font = tooltip.options.bodyFont.string;
              },
            },
          },
          onHover: function (evt, element) {
            if (element.length > 0) {
              //call setToolTipData with chartData[] & element[0].index
              //to change tooltip data
              let bet = bets[element[0].index];
              setActiveTooltip(bet);
            }
          },
        }}
      />
    </div>
  );
}
