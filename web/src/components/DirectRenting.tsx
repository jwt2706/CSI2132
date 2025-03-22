// for when a customer is physically present

import { useState } from "react";

const DirectRenting = () => {
  const [customerId, setCustomerId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleRent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/rentings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, roomId, startDate, endDate }),
      });
      if (response.ok) {
        alert("Room successfully rented!");
      } else {
        alert("Failed to rent room.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-center text-2xl font-bold mb-5">Direct Renting</h1>
      <form className="space-y-4" onSubmit={handleRent}>
        <div className="flex flex-col">
          <label htmlFor="customer_id" className="mb-2 font-medium">
            Customer ID
          </label>
          <input
            type="text"
            id="customer_id"
            className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="room_id" className="mb-2 font-medium">
            Room ID
          </label>
          <input
            type="text"
            id="room_id"
            className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="start_date" className="mb-2 font-medium">
            Start Date
          </label>
          <input
            type="date"
            id="start_date"
            className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="end_date" className="mb-2 font-medium">
            End Date
          </label>
          <input
            type="date"
            id="end_date"
            className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-cyan-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
          Rent Room
        </button>
      </form>
    </div>
  );
};

export default DirectRenting;