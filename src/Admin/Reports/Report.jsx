import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";import { Dialog } from "primereact/dialog";
import "./report.css";
import AdHeader from "../header/AdHeader";
import MonthlyReports from "./monthly/MonthlyReports";
import WeeklyReports from "./WeeklyReports/WeeklyReports";
import YearlyReport from "./yearly/YearlyReport";
import reportImg from "./../../assets/img/reports.gif";

const Report = () => {
  const [visible, setVisible] = useState(false);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch deleted reservations data from API
        const response = await axios.get("https://test-resbackend.vercel.app/api/deleted-reservations");
        
        // Group data by year and calculate yearly stats
        const dataByYear = response.data.reduce((acc, reservation) => {
          const year = new Date(reservation.datetime).getFullYear();
          if (!acc[year]) {
            acc[year] = {
              year,
              totalSales: 0,
              totalTables: new Set(),
              highestTablesBooking: null,
              longestBooking: null,
            };
          }

          // Ensure reservation.total is a number; default to 0 if undefined
          const reservationTotal = reservation.total ? parseFloat(reservation.total) : 0;

          // Update total sales for the year
          acc[year].totalSales += reservationTotal;

          // Collect unique tables booked for the year
          reservation.table.forEach((table) => acc[year].totalTables.add(table));

          // Track reservation with the highest number of tables booked
          if (
            !acc[year].highestTablesBooking ||
            reservation.table.length > acc[year].highestTablesBooking.table.length
          ) {
            acc[year].highestTablesBooking = reservation;
          }

          // Track reservation with the longest duration
          const currentDuration = new Date(reservation.endTime) - new Date(reservation.datetime);
          const longestDuration = acc[year].longestBooking
            ? new Date(acc[year].longestBooking.endTime) -
              new Date(acc[year].longestBooking.datetime)
            : 0;
          if (!acc[year].longestBooking || currentDuration > longestDuration) {
            acc[year].longestBooking = reservation;
          }

          return acc;
        }, {});

        // Prepare the formatted data for the DataTable
        const formattedData = Object.values(dataByYear).map((yearData) => ({
          year: yearData.year,
          totalSales: yearData.totalSales,
          totalTables: yearData.totalTables.size,
          highestTablesBooking: yearData.highestTablesBooking?.name || "-",
          longestBooking: yearData.longestBooking?.name || "-",
        }));

        setYearlyData(formattedData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AdHeader />
      <div className="container">
        <p
          className="mt-3 lead fw-bold text-end pointer info-text"
          onClick={() => setVisible(true)}
        >
          Booking Sales Report Info{" "}
          <i className="pi pi-info-circle text-info"></i>
        </p>
        <div className="row mt-3">
          <div className="col-md-6">
            <img src={reportImg} alt="" className="reportImg" />
          </div>
          <div className="col-md-6">
            <h5 className="text-muted">Sales Weekly Reports :</h5>
            <WeeklyReports />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h5 className="text-muted">Sales Monthly Report :</h5>
            <MonthlyReports />
          </div>
          <div className="col-md-6">
            <h5 className="text-muted">Sales Yearly Report :</h5>
            <YearlyReport />
          </div>
        </div>
      </div>
      <Dialog
        header="Top Customer"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
      <DataTable value={yearlyData} className="p-datatable-striped">
        <Column field="year" header="Year" />
        {/* <Column field="totalSales" header="Total Sales Price" /> */}
        <Column field="totalTables" header="Total Tables Booked" />
        <Column field="highestTablesBooking" header="Most Tables Booked By" />
        <Column field="longestBooking" header="Longest Booking By" />
      </DataTable>
      </Dialog>
    </>
  );
};

export default Report;
