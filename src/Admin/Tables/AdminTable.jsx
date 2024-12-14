import { TabView, TabPanel } from "primereact/tabview";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import AdHeader from "../header/AdHeader";

const AdminTable = () => {
  const [reservations, setReservations] = useState([]);
  const [deletedReservations, setDeletedReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  useEffect(() => {
    fetchReservations();
    fetchDeletedReservations(); // Fetch deleted reservations as well
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("https://test-resbackend.vercel.app/api/getreservations");
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations", error);
    }
  };

  const fetchDeletedReservations = async () => {
    try {
      const response = await axios.get(
        "https://test-resbackend.vercel.app/api/deleted-reservations"
      );
      setDeletedReservations(response.data);
    } catch (error) {
      console.error("Error fetching deleted reservations", error);
    }
  };

  const deleteReservation = async (id) => {
    try {
      await axios.delete(`https://test-resbackend.vercel.app/api/reservations/${id}`);
      fetchReservations(); // Refresh the reservations list
      fetchDeletedReservations(); // Refresh the deleted reservations list
    } catch (error) {
      console.error("Error deleting reservation", error);
    }
  };

  const updateReservation = async () => {
    try {
      await axios.put(
        `https://test-resbackend.vercel.app/api/reservations/${selectedReservation._id}`,
        selectedReservation
      );
      fetchReservations();
      setEditDialogVisible(false);
    } catch (error) {
      console.error("Error updating reservation", error);
    }
  };

  const onRowEditInit = (reservation) => {
    setSelectedReservation({ ...reservation });
    setEditDialogVisible(true);
  };

  const onInputChange = (e, field) => {
    const updatedReservation = { ...selectedReservation };
    updatedReservation[field] = e.target.value;
    setSelectedReservation(updatedReservation);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="">
        <Button
          label=""
          icon="pi pi-pencil"
          onClick={() => onRowEditInit(rowData)}
          className="p-button-sm p-button-success"
        />
        <Button
          label=""
          icon="pi pi-trash"
          onClick={() => deleteReservation(rowData._id)}
          className="p-button-sm p-button-danger"
        />
      </div>
    );
  };

  return (
    <>
      <AdHeader />
      <TabView>
        <TabPanel header="Booked Table">
          <div>
            <DataTable
              value={reservations}
              paginator
              rows={10}
              responsiveLayout="scroll"
            >
              <Column field="name" header="Name" />
              <Column field="email" header="Email" />
              <Column
                field="datetime"
                header="Date & Time"
                body={(rowData) => formatDateTime(rowData.datetime)}
              />
              <Column
                field="endTime"
                header="End Time"
                body={(rowData) => formatDateTime(rowData.endTime)}
              />
              <Column field="duration" header="Duration" />
              <Column field="phone" header="Phone" />
              <Column field="table" header="Table" />
              {/* <Column field="people" header="People" /> */}
              {/* <Column field="specialRequest" header="Special Request" /> */}
              <Column body={actionTemplate} header="Actions" />
            </DataTable>

            <Dialog
              header="Edit Reservation"
              visible={editDialogVisible}
              onHide={() => setEditDialogVisible(false)}
            >
              <div className="field">
                <label htmlFor="name" className="d-block mt-2">Name</label>
                <InputText
                  id="name"
                  value={selectedReservation?.name}
                  onChange={(e) => onInputChange(e, "name")}
                />
              </div>
              <div className="field">
                <label htmlFor="email" className="d-block mt-2">Email</label>
                <InputText
                  id="email"
                  value={selectedReservation?.email}
                  onChange={(e) => onInputChange(e, "email")}
                />
              </div>
              <div className="field">
                <label htmlFor="phone" className="d-block mt-2">Phone</label>
                <InputText
                  id="phone"
                  value={selectedReservation?.phone}
                  onChange={(e) => onInputChange(e, "phone")}
                />
              </div>
              {/* <div className="field">
                                <label htmlFor="people">People</label>
                                <InputText id="people" value={selectedReservation?.people} onChange={(e) => onInputChange(e, 'people')} />
                            </div> */}
              <Button
                label="Save"
                icon="pi pi-check"
                className="mt-2"
                onClick={updateReservation}
              />
            </Dialog>
          </div>
        </TabPanel>

        <TabPanel header="Deleted Tables">
          <div>
            <DataTable
              value={deletedReservations}
              paginator
              rows={10}
              responsiveLayout="scroll"
            >
              <Column field="name" header="Name" />
              <Column field="email" header="Email" />
              <Column field="datetime" header="Date & Time" />
              <Column field="duration" header="Duration" />
              <Column field="phone" header="Phone" />
              <Column field="table" header="Table" />
              {/* <Column field="people" header="People" /> */}
            </DataTable>
          </div>
        </TabPanel>
      </TabView>
    </>
  );
};

export default AdminTable;
