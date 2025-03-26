import React, { useState } from "react";

const ViewTables = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [viewName, setViewName] = useState("");

  const fetchTableData = async (view) => {
    try {
      const response = await fetch(`http://localhost:8080/views/${view}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (data.length > 0) {
        setColumns(Object.keys(data[0]));
        setTableData(data);
        setViewName(view);
      } else {
        setColumns([]);
        setTableData([]);
        setViewName(view);
      }
    } catch (err) {
      console.error(err.message);
      alert("Failed to fetch data.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-center text-3xl font-extrabold mb-6">View Tables</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className="bg-cyan-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          onClick={() => fetchTableData("available_rooms")}
        >
          Show Available Rooms
        </button>
        <button
          className="bg-cyan-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          onClick={() => fetchTableData("total_hotel_capacity")}
        >
          Show Total Hotel Capacity
        </button>
      </div>
      {tableData.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            {viewName === "available_rooms"
              ? "Available Rooms"
              : "Total Hotel Capacity"}
          </h2>
          <table className="w-full text-left border-collapse border border-gray-700">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="border border-gray-700 px-4 py-2 bg-gray-800"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-800">
                  {columns.map((col) => (
                    <td
                      key={col}
                      className="border border-gray-700 px-4 py-2"
                    >
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-8">
          {viewName
            ? `No data available for ${viewName.replace("_", " ")}.`
            : "No data to display."}
        </p>
      )}
    </div>
  );
};

export default ViewTables;