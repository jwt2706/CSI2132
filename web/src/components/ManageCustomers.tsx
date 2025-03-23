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
};

export default ManageCustomers;