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
    <div>
      <h1 className="text-center mt-5">GetStuff</h1>
      <form className="d-flex mt-5" onSubmit={getTables}>
        <select className="form-select" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
          <option disabled value="">
            Select Table
          </option>
          {tables.map((table) => (
            <option key={table.value} value={table.value}>
              {table.display}
            </option>
          ))}
        </select>
        <button className="btn btn-success">Get Table</button>
      </form>
    </div>
  );
};
export default GetTables;
