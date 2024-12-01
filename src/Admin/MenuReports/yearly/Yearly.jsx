import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import axios from "axios";
import moment from "moment";

const Yearly = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/deleted-orders"); // Replace with your API endpoint
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      const yearlySales = Array(4).fill(0); // Array to store sales totals for the last 4 years

      orders.forEach((order) => {
        const orderDate = moment(order.deletedAt); // Make sure to use 'deletedAt' for filtering
        for (let i = 0; i < 4; i++) {
          const yearStart = moment()
            .subtract(i + 1, "years")
            .startOf("year");
          const yearEnd = moment()
            .subtract(i + 1, "years")
            .endOf("year");

          if (orderDate.isBetween(yearStart, yearEnd, "day", "[]")) {
            yearlySales[i] += order.total;
          }
        }
      });

      setChartData({
        labels: [
          moment().subtract(1, "years").format("YYYY"),
          moment().subtract(2, "years").format("YYYY"),
          moment().subtract(3, "years").format("YYYY"),
          moment().subtract(4, "years").format("YYYY"),
        ].reverse(),
        datasets: [
          {
            label: "Total Sales",
            data: yearlySales.reverse(),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });

      setChartOptions({
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      });
    }
  }, [orders]);

  return (
    <div className="card">
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
};

export default Yearly;
