import React, { useState } from "react";

const GetTables = () => {
  const [selectValue, setSelectValue] = useState("");

  const getTables = async (e) => {
    console.log("in get tables", selectValue);
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/${selectValue}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const tables = [
    { value: "hotelchains", display: "Hotel Chains" },
    { value: "hotelchainphonenumbers", display: "Hotel Chain Phone Numbers" },
    { value: "hotelchainemails", display: "Hotel Chain Emails" },
    { value: "hotels", display: "Hotels" },
    { value: "rooms", display: "Rooms" },
    { value: "roomamenities", display: "Room Amenities" },
    { value: "roomavailabledates", display: "Room Available Dates" },
    { value: "customers", display: "Customers" },
    { value: "employees", display: "Employees" },
    { value: "managers", display: "Managers" },
    { value: "bookings", display: "Bookings" },
    { value: "rentings", display: "Rentings" },
    { value: "rentingarchives", display: "Renting Archives" },
    { value: "bookingarchives", display: "Booking Archives" },
  ];

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-center text-2xl font-bold mb-5">GetStuff</h1>
      <form className="flex flex-col space-y-4" onSubmit={getTables}>
        <select
          className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <option disabled value="">
            Select Table
          </option>
          {tables.map((table) => (
            <option key={table.value} value={table.value}>
              {table.display}
            </option>
          ))}
        </select>
        <button className="w-full bg-cyan-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
          Get Table
        </button>
      </form>
    </div>
  );
};

export default GetTables;
