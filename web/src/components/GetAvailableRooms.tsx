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
      <div className="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold mb-5">
          GetAvailableRooms
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={getAvailableRooms}>
          <div className="flex flex-row">
            <div className="flex flex-col items-center">
              <label id="start_date">Start Date</label>
              <input
                className="block"
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
            <div className="flex flex-col items-center">
              <label id="end_date">End Date</label>
              <input
                className="block"
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
            <div className="flex flex-col items-center">
              <label id="room_capacity">Room Capacity</label>
              <select
                className="form-select block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
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
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col items-center">
              <label id="hotel_area">Hotel Area</label>
              <select
                className="form-select block w-full p-2 border border-gray-300 rounded-md bg-white text-black"
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
          <button className="bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-900">
            Get Available Rooms
          </button>
        </form>
      </div>
    </>
  );
};

export default GetAvailableRooms;
