import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import moment from 'moment';

const WeeklySalesReport = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders(); 
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/deleted-orders'); 
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      const weeklySales = Array(4).fill(0); // Array to store sales totals for the last 4 weeks

      orders.forEach(order => {
        const orderDate = moment(order.deletedAt);
        for (let i = 0; i < 4; i++) {
          const weekStart = moment().subtract(i + 1, 'weeks').startOf('week');
          const weekEnd = moment().subtract(i + 1, 'weeks').endOf('week');
          
          if (orderDate.isBetween(weekStart, weekEnd)) {
            weeklySales[i] += order.total;
          }
        }
      });

      setChartData({
        labels: ['Last Week', '2 Weeks Ago', '3 Weeks Ago', '4 Weeks Ago'],
        datasets: [
          {
            label: 'Total Sales',
            data: weeklySales.reverse(),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
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

export default WeeklySalesReport;
