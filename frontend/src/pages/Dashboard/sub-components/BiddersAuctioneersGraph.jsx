import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Bidders",
        data: totalBidders,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 2,
        tension: 0.4, // Smooth lines
        pointStyle: "circle",
        pointRadius: 5,
        pointBackgroundColor: "#4CAF50",
      },
      {
        label: "Auctioneers",
        data: totalAuctioneers,
        borderColor: "#FFC107",
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        borderWidth: 2,
        tension: 0.4, // Smooth lines
        pointStyle: "circle",
        pointRadius: 5,
        pointBackgroundColor: "#FFC107",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures it scales in smaller spaces
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
          font: {
            size: 12, // Adjust tick font size
            family: "Arial",
          },
        },
        grid: {
          color: "#E0E0E0", // Light grid lines
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
            family: "Arial",
          },
        },
        grid: {
          color: "transparent", // No vertical grid lines
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Bidders and Auctioneers Over Time",
        font: {
          size: 16,
          weight: "bold",
        },
        color: "#333",
      },
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        cornerRadius: 5,
        padding: 10,
      },
    },
    elements: {
      point: {
        hoverRadius: 7, // Enlarged radius on hover
      },
    },
  };

  return (
    <div className="w-full h-[400px] sm:h-[500px] bg-white shadow-lg rounded-lg p-6">
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneersGraph;
