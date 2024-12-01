import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import axios from "axios";
import moment from "moment";

const MonthlyReports = () => {
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
    // Create a dictionary to hold the count of reservations per month
    const monthsData = {
      [moment().subtract(3, "months").format("MMM YYYY")]: 0,
      [moment().subtract(2, "months").format("MMM YYYY")]: 0,
      [moment().subtract(1, "months").format("MMM YYYY")]: 0,
      [moment().format("MMM YYYY")]: 0,
    };

    // Count the reservations for each of the last 4 months
    data.forEach((reservation) => {
      const reservationMonth = moment(reservation.datetime).format("MMM YYYY");
      if (monthsData[reservationMonth] !== undefined) {
        monthsData[reservationMonth]++;
      }
    });

    // Prepare chart data
    const labels = Object.keys(monthsData);
    const values = Object.values(monthsData);

    const dataForChart = {
      labels: labels,
      datasets: [
        {
          label: "Monthly Booking",
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

export default MonthlyReports;
