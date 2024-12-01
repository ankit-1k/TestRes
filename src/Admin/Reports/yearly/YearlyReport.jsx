import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import axios from "axios";
import moment from "moment";

const YearlyReport = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    fetchReservationData();
  }, []);

  const fetchReservationData = async () => {
    try {
      const response = await axios.get("https://test-resbackend.vercel.app/api/deleted-reservations"); // Adjust URL as needed
      const reservations = response.data;
      const yearlyData = getYearlyData(reservations);
      setupChartData(yearlyData);
    } catch (error) {
      console.error("Error fetching reservation data", error);
    }
  };

  const getYearlyData = (reservations) => {
    const currentYear = moment().year();
    const yearlyCounts = Array(4).fill(0);

    reservations.forEach((reservation) => {
      const year = moment(reservation.datetime).year();
      const yearIndex = currentYear - year;
      if (yearIndex >= 0 && yearIndex < 4) {
        yearlyCounts[3 - yearIndex]++;
      }
    });

    return yearlyCounts;
  };

  const setupChartData = (yearlyData) => {
    const data = {
      labels: [
        `${moment().subtract(3, "years").year()}`,
        `${moment().subtract(2, "years").year()}`,
        `${moment().subtract(1, "year").year()}`,
        `${moment().year()}`,
      ],
      datasets: [
        {
          label: "Reservations",
          data: yearlyData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    setChartData(data);
    setChartOptions(options);
  };

  return (
    <div className="card">
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
};

export default YearlyReport;
