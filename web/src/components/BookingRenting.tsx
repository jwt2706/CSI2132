import { useState } from "react";

const BookingRenting = () => {
  const [activeTab, setActiveTab] = useState("convert");
  const [bookingId, setBookingId] = useState("");
  const [employeeId, setEmployeeId] = useState(""); // Add state for employee ID
  const [bookings, setBookings] = useState([]);
  const [rentings, setRentings] = useState([]); // Add state for rentings
  const [deleteId, setDeleteId] = useState(""); // Add state for delete ID
  const [deleteType, setDeleteType] = useState("booking"); // Add state for delete type (booking or renting)
  const [newRenting, setNewRenting] = useState({
    customerId: "",
    hotelId: "",
    roomNum: "",
    startDate: "",
    endDate: "",
    employeeId: "",
  });

  const handleFetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:8080/bookings");
      if (response.ok) {
        const data = await response.json();
        setBookings(data.sort((a, b) => a.id - b.id)); // Sort bookings by ID
      } else {
        alert("Failed to fetch bookings.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleFetchRentings = async () => {
    try {
      const response = await fetch("http://localhost:8080/rentings");
      if (response.ok) {
        const data = await response.json();
        setRentings(data.sort((a, b) => a.id - b.id)); // Sort rentings by ID
      } else {
        alert("Failed to fetch rentings.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleConvert = async (e) => {
    e.preventDefault();
    try {
      // Update booking status
      const updateResponse = await fetch(`http://localhost:8080/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (!updateResponse.ok) {
        alert("Failed to update booking status.");
        return;
      }
      const bookingData = await updateResponse.json();

      // Convert booking to renting
      const rentingResponse = await fetch(`http://localhost:8080/bookings/convert/${bookingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: bookingData.customer_id,
          hotel_id: bookingData.hotel_id,
          room_num: bookingData.room_num,
          start_date: bookingData.start_date,
          end_date: bookingData.end_date,
          employee_id: employeeId,
        }),
      });

      if (rentingResponse.ok) {
        alert("Booking successfully converted to renting!");
      } else {
        alert("Failed to create renting.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const endpoint = deleteType === "booking" ? "bookings" : "rentings";
      const response = await fetch(`http://localhost:8080/${endpoint}/${deleteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert(`${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} deleted successfully!`);
        setDeleteId("");
      } else {
        alert(`Failed to delete ${deleteType}.`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleConvertBooking = async (id) => {
    setBookingId(id);
    setActiveTab("convert");
  };

  const handleCreateRenting = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/rentings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: newRenting.customerId,
          hotel_id: newRenting.hotelId,
          room_num: newRenting.roomNum,
          start_date: newRenting.startDate,
          end_date: newRenting.endDate,
          employee_id: newRenting.employeeId,
        }),
      });

      if (response.ok) {
        alert("New renting created successfully!");
        setNewRenting({
          customerId: "",
          hotelId: "",
          roomNum: "",
          startDate: "",
          endDate: "",
          employeeId: "",
        });
      } else {
        alert("Failed to create renting.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === "viewAll") {
      handleFetchBookings();
    } else if (tab === "viewRentings") {
      handleFetchRentings();
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-center text-2xl font-bold mb-5">Booking and Renting Management</h1>
      <div className="flex justify-center mb-4">
        <button className={`px-4 py-2 ${activeTab === "convert" ? "bg-cyan-700" : "bg-gray-700"} text-white rounded-md`} onClick={() => handleTabSwitch("convert")}>
          Convert
        </button>
        <button className={`px-4 py-2 ${activeTab === "viewAll" ? "bg-cyan-700" : "bg-gray-700"} text-white rounded-md mx-2`} onClick={() => handleTabSwitch("viewAll")}>
          View All Bookings
        </button>
        <button className={`px-4 py-2 ${activeTab === "viewRentings" ? "bg-cyan-700" : "bg-gray-700"} text-white rounded-md`} onClick={() => handleTabSwitch("viewRentings")}>
          View All Rentings
        </button>
        <button className={`px-4 py-2 ${activeTab === "delete" ? "bg-cyan-700" : "bg-gray-700"} text-white rounded-md mx-2`} onClick={() => handleTabSwitch("delete")}>
          Delete by ID
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "createRenting" ? "bg-cyan-700" : "bg-gray-700"} text-white rounded-md mx-2`}
          onClick={() => handleTabSwitch("createRenting")}
        >
          Create Renting
        </button>
      </div>
      {activeTab === "convert" && (
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
          <div className="flex flex-col">
            <label htmlFor="employee_id" className="mb-2 font-medium">
              Employee ID
            </label>
            <input
              type="text"
              id="employee_id"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-cyan-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
            Convert to Renting
          </button>
        </form>
      )}
      {activeTab === "viewAll" && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">All Bookings</h2>
          {bookings.length > 0 ? (
            <ul className="space-y-2">
              {bookings.map((booking) => (
                <li key={booking.id} className="p-3 border border-gray-700 rounded-md bg-gray-800">
                  <p>
                    <strong>ID:</strong> {booking.id}
                  </p>
                  <p>
                    <strong>Customer ID:</strong> {booking.customer_id}
                  </p>
                  <p>
                    <strong>Hotel ID:</strong> {booking.hotel_id}
                  </p>
                  <p>
                    <strong>Room Number:</strong> {booking.room_num}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {booking.start_date}
                  </p>
                  <p>
                    <strong>End Date:</strong> {booking.end_date}
                  </p>
                  <p>
                    <strong>Status:</strong> {booking.status}
                  </p>
                  {booking.status === "Confirmed" && (
                    <button className="mt-2 bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-800" onClick={() => handleConvertBooking(booking.id)}>
                      Convert to Renting
                    </button>
                  )}
                  <button
                    className="mt-2 bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800"
                    onClick={() => {
                      setDeleteId(booking.id);
                      setDeleteType("booking");
                      setActiveTab("delete");
                    }}
                  >
                    Delete Booking
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      )}
      {activeTab === "viewRentings" && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">All Rentings</h2>
          {rentings.length > 0 ? (
            <ul className="space-y-2">
              {rentings.map((renting) => (
                <li key={renting.id} className="p-3 border border-gray-700 rounded-md bg-gray-800">
                  <p>
                    <strong>ID:</strong> {renting.id}
                  </p>
                  <p>
                    <strong>Customer ID:</strong> {renting.customer_id}
                  </p>
                  <p>
                    <strong>Hotel ID:</strong> {renting.hotel_id}
                  </p>
                  <p>
                    <strong>Room Number:</strong> {renting.room_num}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {renting.start_date}
                  </p>
                  <p>
                    <strong>End Date:</strong> {renting.end_date}
                  </p>
                  <p>
                    <strong>Employee ID:</strong> {renting.employee_id}
                  </p>
                  <button
                    className="mt-2 bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800"
                    onClick={() => {
                      setDeleteId(renting.id);
                      setDeleteType("renting");
                      setActiveTab("delete");
                    }}
                  >
                    Delete Renting
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No rentings found.</p>
          )}
        </div>
      )}
      {activeTab === "delete" && (
        <form className="space-y-4" onSubmit={handleDelete}>
          <h2 className="text-xl font-bold">Delete by ID</h2>
          <div className="flex flex-col">
            <label htmlFor="delete_id" className="mb-2 font-medium">
              ID to Delete
            </label>
            <input
              type="text"
              id="delete_id"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="delete_type" className="mb-2 font-medium">
              Type
            </label>
            <select
              id="delete_type"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={deleteType}
              onChange={(e) => setDeleteType(e.target.value)}
            >
              <option value="booking">Booking</option>
              <option value="renting">Renting</option>
            </select>
          </div>
          <button className="w-full bg-red-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:outline-none">Delete</button>
        </form>
      )}
      {activeTab === "createRenting" && (
        <form className="space-y-4" onSubmit={handleCreateRenting}>
          <h2 className="text-xl font-bold">Create Manual Renting</h2>
          <div className="flex flex-col">
            <label htmlFor="customer_id" className="mb-2 font-medium">
              Customer ID
            </label>
            <input
              type="text"
              id="customer_id"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={newRenting.customerId}
              onChange={(e) => setNewRenting({ ...newRenting, customerId: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="hotel_id" className="mb-2 font-medium">
              Hotel ID
            </label>
            <input
              type="text"
              id="hotel_id"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={newRenting.hotelId}
              onChange={(e) => setNewRenting({ ...newRenting, hotelId: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="room_num" className="mb-2 font-medium">
              Room Number
            </label>
            <input
              type="text"
              id="room_num"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={newRenting.roomNum}
              onChange={(e) => setNewRenting({ ...newRenting, roomNum: e.target.value })}
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
              value={newRenting.startDate}
              onChange={(e) => setNewRenting({ ...newRenting, startDate: e.target.value })}
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
              value={newRenting.endDate}
              onChange={(e) => setNewRenting({ ...newRenting, endDate: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="employee_id" className="mb-2 font-medium">
              Employee ID
            </label>
            <input
              type="text"
              id="employee_id"
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={newRenting.employeeId}
              onChange={(e) => setNewRenting({ ...newRenting, employeeId: e.target.value })}
              required
            />
          </div>
          <div className="p-4 border border-gray-700 rounded-md bg-gray-800">
            <h3 className="text-lg font-bold mb-3">Payment Information</h3>
            <div className="flex flex-col mb-3">
              <label htmlFor="credit_card_number" className="mb-2 font-medium">
                Credit Card Number
              </label>
              <input
                type="text"
                id="credit_card_number"
                className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="expiration_date" className="mb-2 font-medium">
                Expiration Date
              </label>
              <input
                type="text"
                id="expiration_date"
                className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                placeholder="MM/YY"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="security_code" className="mb-2 font-medium">
                Security Code
              </label>
              <input
                type="text"
                id="security_code"
                className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                placeholder="123"
              />
            </div>
          </div>
          <button className="w-full bg-cyan-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
            Create Renting
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingRenting;
