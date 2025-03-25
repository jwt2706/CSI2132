import { useState } from "react";

const ManageCustomers = () => {
  const [customer, setCustomer] = useState({ id: "", name: "", email: "" });

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });
      if (response.ok) {
        alert("Customer added successfully!");
      } else {
        alert("Failed to add customer.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/customers/${customer.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Customer deleted successfully!");
      } else {
        alert("Failed to delete customer.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/customers/${customer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });
      if (response.ok) {
        alert("Customer updated successfully!");
      } else {
        alert("Failed to update customer.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-center text-2xl font-bold mb-5">Manage Customers</h1>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="id" className="mb-2 font-medium">Customer ID</label>
          <input
            type="text"
            id="id"
            className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            value={customer.id}
            onChange={(e) => setCustomer({ ...customer, id: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-medium">Name</label>
          <input
            type="text"
            id="name"
            className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-medium">Email</label>
          <input
            type="email"
            id="email"
            className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          />
        </div>
        <div className="flex space-x-4">
          <button
            className="w-1/3 bg-green-700 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
            onClick={handleInsert}
          >
            Insert
          </button>
          <button
            className="w-1/3 bg-yellow-700 text-white py-2 px-4 rounded-md font-semibold hover:bg-yellow-800 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="w-1/3 bg-red-700 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageCustomers;