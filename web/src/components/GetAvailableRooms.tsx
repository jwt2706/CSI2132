import { useState } from "react";

const GetAvailableRooms = () => {
  const [searchParams, setSearchParams] = useState({
    start_date: "",
    end_date: "",
    room_capacity: "",
    hotel_area: "",
    hotel_chain_name: "",
    hotel_category: "",
    hotel_room_amount: "",
    room_price: "",
  });

  const capacities = ["Single", "Double", "Triple", "Suite", "Penthouse"];
  const categories = ["Luxury", "Hostel", "Resort"];
  const areas = ["Downtown", "Beach", "Suburb"];

  function getDate() {
    const today = new Date();
    const month =
      (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1);
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  }
  const getAvailableRooms = async (e) => {
    e.preventDefault();
    try {
      const filteredParams = Object.fromEntries(
        Object.entries(searchParams).filter(([_, v]) => v !== "")
      );

      filteredParams.start_date = `'${filteredParams.start_date}'`;
      filteredParams.end_date = `'${filteredParams.end_date}'`;

      const url =
        "http://localhost:8080/availability/rooms?" +
        new URLSearchParams(filteredParams).toString();

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

    return (
    <>
      <div className="max-w-2xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-center text-3xl font-extrabold mb-6">
          Search Available Rooms
        </h1>
        <form className="space-y-6" onSubmit={getAvailableRooms}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="start_date" className="mb-2 font-medium">
                Start Date
              </label>
              <input
                className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                type="date"
                id="start_date"
                name="Start Date"
                required
                value={searchParams.start_date}
                min={getDate()}
                onChange={(e) =>
                  setSearchParams((prevState) => ({
                    ...prevState,
                    start_date: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="end_date" className="mb-2 font-medium">
                End Date
              </label>
              <input
                className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                type="date"
                id="end_date"
                name="End Date"
                required
                value={searchParams.end_date}
                min={searchParams.start_date}
                onChange={(e) =>
                  setSearchParams((prevState) => ({
                    ...prevState,
                    end_date: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="room_capacity" className="mb-2 font-medium">
                Room Capacity
              </label>
              <select
                className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                value={searchParams.room_capacity}
                onChange={(e) =>
                  setSearchParams((prevState) => ({
                    ...prevState,
                    room_capacity: e.target.value,
                  }))
                }
              >
                <option disabled value="">
                  Select Room Capacity
                </option>
                {capacities.map((capacity) => (
                  <option key={capacity} value={capacity}>
                    {capacity}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="hotel_area" className="mb-2 font-medium">
                Hotel Area
              </label>
              <select
                className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                value={searchParams.hotel_area}
                onChange={(e) =>
                  setSearchParams((prevState) => ({
                    ...prevState,
                    hotel_area: e.target.value,
                  }))
                }
              >
                <option disabled value="">
                  Select Hotel Area
                </option>
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="w-full bg-cyan-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
            Get Available Rooms
          </button>
        </form>
      </div>
    </>
  );
};

export default GetAvailableRooms;
