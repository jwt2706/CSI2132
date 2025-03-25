<<<<<<< HEAD
import React, { useState, useEffect } from "react";

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ name: "", email: "" });

    const fetchCustomers = async () => {
        const response = await fetch("/api/customers");
        const data = await response.json();
        setCustomers(data);
    };

    const addCustomer = async (e) => {
        e.preventDefault();
        await fetch("/api/customers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCustomer),
        });
        setNewCustomer({ name: "", email: "" });
        fetchCustomers();
    };

    const deleteCustomer = async (id) => {
        await fetch(`/api/customers/${id}`, { method: "DELETE" });
        fetchCustomers();
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
            <h1 className="text-center text-2xl font-bold mb-5">Manage Customers</h1>
            <form className="space-y-4" onSubmit={addCustomer}>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        value={newCustomer.name}
                        onChange={(e) =>
                            setNewCustomer((prev) => ({ ...prev, name: e.target.value }))
                        }
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        value={newCustomer.email}
                        onChange={(e) =>
                            setNewCustomer((prev) => ({ ...prev, email: e.target.value }))
                        }
                        required
                    />
                </div>
                <button className="w-full bg-cyan-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                    Add Customer
                </button>
            </form>

            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Customer List</h2>
                <ul className="space-y-4">
                    {customers.map((customer) => (
                        <li
                            key={customer.id}
                            className="p-4 bg-gray-800 rounded-lg shadow-md flex justify-between items-center"
                        >
                            <div>
                                <p className="font-medium">Name: {customer.name}</p>
                                <p className="text-sm text-gray-400">Email: {customer.email}</p>
                            </div>
                            <button
                                onClick={() => deleteCustomer(customer.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
=======
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
>>>>>>> 33dcca8 (rm get tables)
};

export default ManageCustomers;