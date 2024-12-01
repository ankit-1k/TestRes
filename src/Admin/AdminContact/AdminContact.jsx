import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import axios from "axios";
import AdHeader from "../header/AdHeader";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  // const baseURL = window.location.hostname === "localhost" 
  // ? "https://test-resbackend.vercel.app/api" 
  // : "https://restaurantbackend-1b3r0ac66-ankits-projects-1030ff5d.vercel.app/api";
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `https://test-resbackend.vercel.app/api/getcontact`
        );
        setContacts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://test-resbackend.vercel.app/api/contact/${id}`
      );
      console.log(response.data); // Logs success message
      // Remove the deleted contact from the local state
      setContacts(contacts.filter((contact) => contact._id !== id));
      alert("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Error deleting contact. Please try again.");
    }
  };

  return (
    <div>
      <AdHeader />
      <div className="container">
        <h2 className="mt-5">Admin Contact Management</h2>

        <DataTable
          className="mt-5"
          value={contacts}
          paginator
          rows={10}
          responsiveLayout="scroll"
        >
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column field="subject" header="Subject" />
          <Column field="message" header="Message" />
          <Column
            body={(rowData) => (
              <Button
                icon="pi pi-trash"
                className="p-button-danger"
                onClick={() => handleDelete(rowData._id)}
              />
            )}
            header="Actions"
          />
        </DataTable>
      </div>
    </div>
  );
};

export default AdminContact;
