import React, { useState } from "react";

const GetTables = () => {
  const [selectValue, setSelectValue] = useState("hotels");

  const getHotels = async (e) => {
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

  return (
    <div>
      <h1 className="text-center mt-5">GetStuff</h1>
      <form className="d-flex mt-5" onSubmit={getHotels}>
        <select className="form-select" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
          <option value="hotels">hotels</option>
          <option value="rooms">Rooms</option>
          <option value="employees">Employees</option>
          <option value="guests">Guests</option>
          <option value="reservations">Reservations</option>
          <option value="services">Services</option>
          <option value="service_orders">Service Orders</option>
        </select>
        <button className="btn btn-success">Get Table</button>
      </form>
    </div>
  );
};
export default GetTables;
