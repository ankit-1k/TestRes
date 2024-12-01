import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import axios from "axios";
import moment from "moment";

const WeeklyReports = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        "https://test-resbackend.vercel.app/api/deleted-reservations"
      );
      setReservations(response.data);
      processReservationsData(response.data);
    } catch (error) {
      console.error("Error fetching reservations", error);
    }
  };

  const processReservationsData = (data) => {
    // Get the start dates for the last 4 weeks
    const last4Weeks = [];
    for (let i = 0; i < 4; i++) {
      last4Weeks.push(moment().subtract(i, "weeks").startOf("week"));
    }

    // Initialize week data with labels and counts
    const weeksData = {};
    last4Weeks.reverse().forEach((weekStart, index) => {
      weeksData[weekStart.format("MMM D")] = 0;
    });

    // Count reservations within each week range
    data.forEach((reservation) => {
      const reservationDate = moment(reservation.datetime);
      last4Weeks.forEach((weekStart, index) => {
        const weekEnd = moment(weekStart).endOf("week");
        if (reservationDate.isBetween(weekStart, weekEnd, "day", "[]")) {
          const label = weekStart.format("MMM D");
          weeksData[label]++;
        }
      });
    });

    // Prepare data for the chart
    const labels = Object.keys(weeksData);
    const values = Object.values(weeksData);

    const dataForChart = {
      labels: labels,
      datasets: [
        {
          label: "Weekly Booking",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    };

    setChartData(dataForChart);
    setChartOptions(options);
  };

  return (
    <>
      <div className="card">
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default WeeklyReports;
