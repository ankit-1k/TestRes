import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import moment from 'moment';

const Monthly = () => {
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
      const monthlySales = Array(4).fill(0); // Array to store sales totals for the last 4 months

      orders.forEach(order => {
        const orderDate = moment(order.deletedAt);
        for (let i = 0; i < 4; i++) {
          const monthStart = moment().subtract(i + 1, 'months').startOf('month');
          const monthEnd = moment().subtract(i + 1, 'months').endOf('month');
          
          if (orderDate.isBetween(monthStart, monthEnd, 'day', '[]')) {
            monthlySales[i] += order.total;
          }
        }
      });

      setChartData({
        labels: [
          moment().subtract(1, 'months').format('MMMM'),
          moment().subtract(2, 'months').format('MMMM'),
          moment().subtract(3, 'months').format('MMMM'),
          moment().subtract(4, 'months').format('MMMM')
        ].reverse(),
        datasets: [
          {
            label: 'Total Sales',
            data: monthlySales.reverse(),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
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

export default Monthly;
