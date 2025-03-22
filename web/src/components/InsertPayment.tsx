// record customer payments for renting

import { useState } from "react";

const InsertPayment = () => {
  const [rentingId, setRentingId] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rentingId, amount }),
      });
      if (response.ok) {
        alert("Payment successfully recorded!");
      } else {
        alert("Failed to record payment.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-center text-2xl font-bold mb-5">Insert Payment</h1>
      <form className="space-y-4" onSubmit={handlePayment}>
        <div className="flex flex-col">
          <label htmlFor="renting_id" className="mb-2 font-medium">
            Renting ID
          </label>
          <input
            type="text"
            id="renting_id"
            className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            value={rentingId}
            onChange={(e) => setRentingId(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount" className="mb-2 font-medium">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-cyan-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
          Record Payment
        </button>
      </form>
    </div>
  );
};

export default InsertPayment;