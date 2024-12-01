import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Include theme
import "primereact/resources/primereact.min.css"; // PrimeReact CSS
import "primeicons/primeicons.css";
const ViewMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Breakfast'); // Selected category
  const [editDialog, setEditDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    img: "",
    name: "",
    message: "",
    price: "",
  });

  // Fetch menu items from the server
  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/getmenu");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };
  useEffect(() => {
    fetchMenu();
  }, []);

  // Delete a menu item
  const handleDelete = async (categoryId, itemIndex) => {
    try {
      // Send DELETE request to the backend
      await axios.delete(
        `http://localhost:4000/api/deletemenu/${categoryId}/${itemIndex}`
      );

      // Update local state to remove the deleted item
      setMenuItems((prevItems) =>
        prevItems.map((menuItem) =>
          menuItem._id === categoryId
            ? {
                ...menuItem,
                items: menuItem.items.filter((_, index) => index !== itemIndex),
              }
            : menuItem
        )
      );
      fetchMenu();
      console.log("Menu item deleted successfully!");
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  // Open edit dialog with selected item data
  const handleUpdate = (menuItem, itemIndex) => {
    setCurrentItem({ categoryId: menuItem._id, itemIndex });
    setFormData(menuItem.items[itemIndex]);
    setEditDialog(true);
  };

  // Save updated item
  const saveUpdate = async () => {
    try {
      const { categoryId, itemIndex } = currentItem;
      const response = await axios.put(
        `http://localhost:4000/api/updatemenu/${categoryId}/${itemIndex}`,
        formData
      );
      setMenuItems((prevItems) =>
        prevItems.map((menuItem) =>
          menuItem._id === categoryId
            ? {
                ...menuItem,
                items: menuItem.items.map((item, index) =>
                  index === itemIndex
                    ? response.data.menuItem.items[itemIndex]
                    : item
                ),
              }
            : menuItem
        )
      );
      setEditDialog(false);
      fetchMenu();
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  // Filter items based on selected category
  const filteredItems = selectedCategory
    ? menuItems.find((menuItem) => menuItem.category === selectedCategory)
        ?.items || []
    : [];

  // Dropdown options
  const categoryOptions = menuItems.map((menuItem) => ({
    label: menuItem.category,
    value: menuItem.category,
  }));
  return (
    <>
      <div>
        <h2 className="text-center">Menu Items</h2>

        {/* Dropdown for selecting category */}
        <div className="d-flex justify-content-end mb-2">
          <Dropdown
            value={selectedCategory}
            options={categoryOptions}
            onChange={(e) => setSelectedCategory(e.value)}
            placeholder="Select a Category"
            style={{ width: "15rem" }}
          />
        </div>

        <DataTable value={filteredItems} responsiveLayout="scroll">
          <Column field="name" header="Name"></Column>
          <Column
            body={(item) => (
              <img src={item.img} alt={item.name} width="50" height="50" />
            )}
            header="Image"
          ></Column>
          <Column field="message" header="Description"></Column>
          <Column field="price" header="Price"></Column>
          <Column
            body={(rowData, options) => {
              const itemIndex = options.rowIndex;
              return (
                <div>
                  <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() =>
                      handleUpdate(
                        { items: filteredItems, _id: selectedCategory },
                        itemIndex
                      )
                    }
                  />
                  <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    onClick={() => handleDelete(selectedCategory, itemIndex)}
                  />
                </div>
              );
            }}
            header="Actions"
          />
        </DataTable>

        {/* Update Dialog */}
        <Dialog
          visible={editDialog}
          style={{ width: "450px" }}
          header="Update Menu Item"
          modal
          onHide={() => setEditDialog(false)}
        >
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="img">Image URL</label>
              <InputText
                id="img"
                value={formData.img}
                onChange={(e) =>
                  setFormData({ ...formData, img: e.target.value })
                }
              />
            </div>
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="field">
              <label htmlFor="message">Description</label>
              <InputText
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
            <div className="field">
              <label htmlFor="price">Price</label>
              <InputText
                id="price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
          </div>
          <Button label="Save" className="mt-2" icon="pi pi-check" onClick={saveUpdate} />
        </Dialog>
      </div>
    </>
  );
};

export default ViewMenu;
