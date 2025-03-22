// convert a booking into renting when a customer checks in

import { useState } from "react";

const TurnBookingToRenting = () => {
  const [bookingId, setBookingId] = useState("");

  const handleConvert = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/bookings/${bookingId}/convert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        alert("Booking successfully converted to renting!");
      } else {
        alert("Failed to convert booking.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-center text-2xl font-bold mb-5">Convert Booking to Renting</h1>
      <form className="space-y-4" onSubmit={handleConvert}>
        <div className="flex flex-col">
          <label htmlFor="booking_id" className="mb-2 font-medium">
            Booking ID
          </label>
          <input
            type="text"
            id="booking_id"
            className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-cyan-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
          Convert to Renting
        </button>
      </form>
    </div>
  );
};

export default TurnBookingToRenting;