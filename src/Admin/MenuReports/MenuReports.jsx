import React, { useEffect, useState } from "react";
import Weekly from "./Weekly/Weekly";
import AdHeader from "../header/AdHeader";
import Monthly from "./monthly/Monthly";
import Yearly from "./yearly/Yearly";
import reportImg from "../../assets/img/reports.gif"; // Assuming reportImg is imported here
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const MenuReports = () => {
  const [visible, setVisible] = useState(false);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const fetchYearlyData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/deleted-orders"
        );

        // Group data by year and calculate statistics
        const dataByYear = response.data.reduce((acc, order) => {
          const year = new Date(order.deletedAt).getFullYear();

          if (!acc[year]) {
            acc[year] = {
              year,
              totalSales: 0,
              totalTables: new Set(),
              buyers: {},
              mostBuyer: null,
              longestBooking: null,
            };
          }

          // Calculate total sales
          acc[year].totalSales += order.total;

          // Track unique tables booked
          acc[year].totalTables.add(order.table);

          // Count orders per buyer
          acc[year].buyers[order.name] =
            (acc[year].buyers[order.name] || 0) + 1;

          // Update the most frequent buyer
          if (
            !acc[year].mostBuyer ||
            acc[year].buyers[order.name] > acc[year].buyers[acc[year].mostBuyer]
          ) {
            acc[year].mostBuyer = order.name;
          }

          // Track the longest booking time (if applicable)
          const bookingDuration = order.items.reduce(
            (sum, item) => sum + item.price,
            0
          );
          if (
            !acc[year].longestBooking ||
            bookingDuration > acc[year].longestBooking.duration
          ) {
            acc[year].longestBooking = {
              name: order.name,
              duration: bookingDuration,
            };
          }

          return acc;
        }, {});

        // Format the yearly data for the table
        const formattedData = Object.values(dataByYear).map((yearData) => ({
          year: yearData.year,
          totalSales:`₹ ${yearData.totalSales}`,
          // totalTables: yearData.totalTables.size,
          mostBuyer: yearData.mostBuyer,
          longestBooking: `${yearData.longestBooking?.name}`,
        }));

        setYearlyData(formattedData);
      } catch (error) {
        console.error("Error fetching yearly data:", error);
      }
    };

    fetchYearlyData();
  }, []);
  return (
    <div>
      <AdHeader />
      <div className="container">
        <p className="mt-3 lead fw-bold text-end pointer" onClick={()=>setVisible(true)}>
          Food Sales Report Info <i className="pi pi-info-circle"></i>
        </p>
        <div className="row mt-">
          <div className="col-md-6">
            <img src={reportImg} alt="Report" className="reportImg" />
          </div>
          <div className="col-md-6">
            <h5 className="text-muted">Sales Weekly Reports :</h5>
            <Weekly />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h5 className="text-muted">Sales Monthly Report :</h5>
            <Monthly />
          </div>
          <div className="col-md-6">
            <h5 className="text-muted">Sales Yearly Report :</h5>
            <Yearly />
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
          <Column field="totalSales" header="Total Sales" />
          {/* <Column field="totalTables" header="Total Tables Booked" /> */}
          <Column field="mostBuyer" header="Most Frequent Buyer" />
          <Column field="longestBooking" header="Longest Booking" />
        </DataTable>
      </Dialog>
    </div>
  );
};

export default MenuReports;

// https://chatgpt.com/share/672fba69-0fd8-800d-b368-83c8831ee907
