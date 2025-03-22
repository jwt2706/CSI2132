import React from "react";
import logo from "/logo.png";

const Header = ({ view, setView }) => {
  return (
    <header className="w-full flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <img src={logo} alt="EHotelDB Logo" className="h-12 mr-4" />
        <h1 className="text-xl">EHotelDB</h1>
      </div>
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            view === "customer"
              ? "bg-cyan-700 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => setView("customer")}
        >
          Customer View
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            view === "employee"
              ? "bg-cyan-700 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => setView("employee")}
        >
          Employee View
        </button>
      </div>
    </header>
  );
};

export default Header;