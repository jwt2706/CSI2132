import { useState } from "react";

const ManageCustomers = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [customer, setCustomer] = useState({
    id: "",
    government_id_type: "",
    government_id: "",
    first_name: "",
    last_name: "",
    street_number: "",
    street_name: "",
  });
  const [customers, setCustomers] = useState([]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const customerData = { ...customer };
      delete customerData.id;
      const response = await fetch("http://localhost:8080/customers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      });
      if (response.ok) {
        alert("Customer created successfully!");
        handleTabSwitch("create");
      } else {
        alert("Failed to create customer.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleFetchCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/customers/${customer.id}`);
      if (response.ok) {
        const data = await response.json();
        setCustomer(data);
        alert("Customer fetched successfully!");
      } else {
        alert("Failed to fetch customer.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/customers/${customer.id}`, {
        method: "PATCH",
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

  const handleFetchAllCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8080/customers");
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      } else {
        alert("Failed to fetch customers.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setCustomer((prevCustomer) => ({
      id: prevCustomer.id,
      government_id_type: "",
      government_id: "",
      first_name: "",
      last_name: "",
      street_number: "",
      street_name: "",
    }));
    if (tab === "viewAll") {
      handleFetchAllCustomers();
    }
  };

  const handleEditFromList = (customer) => {
    setCustomer(customer);
    setActiveTab("edit");
  };

  const handleDeleteFromList = (customerId) => {
    setCustomer({ id: customerId });
    setActiveTab("delete");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-center text-2xl font-bold mb-5">Manage Customers</h1>
      <div className="flex justify-center mb-4">
        <button className={`px-4 py-2 ${activeTab === "create" ? "bg-cyan-700" : "bg-gray-700"} text-white rounded-md`} onClick={() => handleTabSwitch("create")}>
          Create
        </button>
        <button className={`px-4 py-2 ${activeTab === "edit" ? "bg-cyan-700" : "bg-gray-700"} text-white rounded-md mx-2`} onClick={() => handleTabSwitch("edit")}>
          Edit
        </button>
        <button className={`px-4 py-2 ${activeTab === "delete" ? "bg-cyan-700" : "bg-gray-700"} text-white rounded-md`} onClick={() => handleTabSwitch("delete")}>
          Delete
        </button>
        <button className={`px-4 py-2 ${activeTab === "viewAll" ? "bg-cyan-700" : "bg-gray-700"} text-white rounded-md mx-2`} onClick={() => handleTabSwitch("viewAll")}>
          View All
        </button>
      </div>
      {activeTab === "create" && (
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="government_id_type" className="mb-2 font-medium">
              Government ID Type
            </label>
            <select
              id="government_id_type"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.government_id_type}
              onChange={(e) => setCustomer({ ...customer, government_id_type: e.target.value })}
            >
              <option value="">Select ID Type</option>
              <option value="ssn">SSN</option>
              <option value="sin">SIN</option>
              <option value="driver’s license">Driver’s License</option>
              <option value="HC">HC</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="government_id" className="mb-2 font-medium">
              Government ID
            </label>
            <input
              type="text"
              id="government_id"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.government_id}
              onChange={(e) => setCustomer({ ...customer, government_id: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="first_name" className="mb-2 font-medium">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.first_name}
              onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="last_name" className="mb-2 font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.last_name}
              onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="street_number" className="mb-2 font-medium">
              Street Number
            </label>
            <input
              type="number"
              id="street_number"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.street_number}
              onChange={(e) => setCustomer({ ...customer, street_number: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="street_name" className="mb-2 font-medium">
              Street Name
            </label>
            <input
              type="text"
              id="street_name"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.street_name}
              onChange={(e) => setCustomer({ ...customer, street_name: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            Create Customer
          </button>
        </form>
      )}
      {activeTab === "edit" && (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="id" className="mb-2 font-medium">
              Customer ID
            </label>
            <input
              type="text"
              id="id"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.id}
              onChange={(e) => setCustomer({ ...customer, id: e.target.value })}
            />
          </div>
          <button
            onClick={handleFetchCustomer}
            className="w-full bg-blue-700 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Fetch Customer
          </button>
          {/* Display all fields with fetched customer information */}
          <div className="flex flex-col">
            <label htmlFor="government_id_type" className="mb-2 font-medium">
              Government ID Type
            </label>
            <select
              id="government_id_type"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.government_id_type}
              onChange={(e) => setCustomer({ ...customer, government_id_type: e.target.value })}
            >
              <option value="">Select ID Type</option>
              <option value="ssn">SSN</option>
              <option value="sin">SIN</option>
              <option value="driver’s license">Driver’s License</option>
              <option value="HC">HC</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="government_id" className="mb-2 font-medium">
              Government ID
            </label>
            <input
              type="text"
              id="government_id"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.government_id}
              onChange={(e) => setCustomer({ ...customer, government_id: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="first_name" className="mb-2 font-medium">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.first_name}
              onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="last_name" className="mb-2 font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.last_name}
              onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="street_number" className="mb-2 font-medium">
              Street Number
            </label>
            <input
              type="number"
              id="street_number"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.street_number}
              onChange={(e) => setCustomer({ ...customer, street_number: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="street_name" className="mb-2 font-medium">
              Street Name
            </label>
            <input
              type="text"
              id="street_name"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.street_name}
              onChange={(e) => setCustomer({ ...customer, street_name: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-700 text-white py-2 px-4 rounded-md font-semibold hover:bg-yellow-800 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          >
            Update Customer
          </button>
        </form>
      )}
      {activeTab === "delete" && (
        <form onSubmit={handleDelete} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="id" className="mb-2 font-medium">
              Customer ID
            </label>
            <input
              type="text"
              id="id"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={customer.id}
              onChange={(e) => setCustomer({ ...customer, id: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full bg-red-700 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:outline-none">
            Delete Customer
          </button>
        </form>
      )}
      {activeTab === "viewAll" && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">All Customers</h2>
          {customers.length > 0 ? (
            <ul className="space-y-2">
              {customers.map((cust) => (
                <li key={cust.id} className="p-3 border border-gray-700 rounded-md bg-gray-800">
                  <p>
                    <strong>ID:</strong> {cust.id}
                  </p>
                  <p>
                    <strong>Government ID Type:</strong> {cust.government_id_type}
                  </p>
                  <p>
                    <strong>Government ID:</strong> {cust.government_id}
                  </p>
                  <p>
                    <strong>First Name:</strong> {cust.first_name}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {cust.last_name}
                  </p>
                  <p>
                    <strong>Street Number:</strong> {cust.street_number}
                  </p>
                  <p>
                    <strong>Street Name:</strong> {cust.street_name}
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      className="bg-yellow-700 text-white py-1 px-3 rounded-md font-semibold hover:bg-yellow-800 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                      onClick={() => handleEditFromList(cust)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-700 text-white py-1 px-3 rounded-md font-semibold hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                      onClick={() => handleDeleteFromList(cust.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No customers found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageCustomers;
