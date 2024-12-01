import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);

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
        label: "Payments (₹)",
        data: monthlyRevenue,
        backgroundColor: [
          "#4A90E2",
          "#50C878",
          "#FFD700",
          "#FF7F50",
          "#8A2BE2",
          "#D2691E",
          "#FF4500",
          "#4682B4",
          "#32CD32",
          "#FF69B4",
          "#20B2AA",
          "#800000",
        ],
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "rgba(0,0,0,0.1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Adjusts for smaller screens
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `₹${value.toLocaleString()}`;
          },
          font: {
            size: 12,
            family: "Arial",
          },
          color: "#555", // Softer color for ticks
        },
        grid: {
          color: "#E0E0E0", // Light gridlines for better readability
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
            family: "Arial",
          },
          color: "#555",
        },
        grid: {
          display: false, // Removes vertical gridlines for cleaner visuals
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Monthly Payments Overview (₹)",
        font: {
          size: 16,
          weight: "bold",
          family: "Arial",
        },
        color: "#333",
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12,
          },
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        bodyFont: { size: 14 },
        titleFont: { size: 14 },
        titleAlign: "center",
        bodyAlign: "center",
        callbacks: {
          label: function (context) {
            return `₹${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    animation: {
      duration: 1000, // Smooth animation duration
      easing: "easeInOutQuad", // Smooth easing for animations
    },
  };

  return (
    <div className="w-full h-[400px] sm:h-[500px] bg-white shadow-lg rounded-lg p-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaymentGraph;
