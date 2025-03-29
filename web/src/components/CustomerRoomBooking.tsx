import React, { useState } from "react";

const CustomerRoomBooking = () => {
  const [searchParams, setSearchParams] = useState({
    start_date: "",
    end_date: "",
    room_capacity: "",
    hotel_area: "",
    hotel_chain_name: "",
    hotel_category: "",
    hotel_room_amount: "5",
    min_room_price: "80",
    max_room_price: "400",
  });

  interface Room {
    id: number;
    room_num: number;
    hotel_name: string;
    capacity: string;
    price: number;
  }

  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

  const capacities = ["Single", "Double", "Triple", "Suite", "Penthouse"];
  const categories = ["Luxury", "Hostel", "Resort"];
  const areas = ["Downtown", "Beach", "Suburb"];
  const hotelChainNames = [
    "Luxury Stays",
    "Mountain Resorts",
    "Sunny Hostels",
    "City Comfort",
    "Global Inns",
  ];

  function getDate() {
    const today = new Date();
    const month =
      (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1);
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  }

  const searchAvailableRooms = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (searchParams.min_room_price === "") {
        searchParams.min_room_price = "80";
      }
      if (searchParams.max_room_price === "") {
        searchParams.max_room_price = "400";
      }
      const filteredParams = Object.fromEntries(
        Object.entries(searchParams).filter(([, v]) => v !== "")
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
      setAvailableRooms(response);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    }
  };

  const rentRoom = async (hotel_id: number, room_num: number) => {
    try {
      const rentingDetails = {
        hotel_id: hotel_id,
        room_num: room_num,
        customer_id: 1,
        start_date: searchParams.start_date,
        end_date: searchParams.end_date,
        employee_id: 1,
      };

      const response = await fetch("http://localhost:8080/rentings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rentingDetails),
      });

      console.log(response);

      if (response.ok) {
        alert("Room successfully booked!");
      } else {
        alert("Failed to book room.");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    }
  };

  const bookRoom = async (hotel_id: number, room_num: number) => {
    try {
      const bookingDetails = {
        hotel_id: hotel_id,
        room_num: room_num,
        customer_id: 1,
        start_date: searchParams.start_date,
        end_date: searchParams.end_date,
      };

      const response = await fetch("http://localhost:8080/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });

      console.log(response);

      if (response.ok) {
        alert("Room successfully booked!");
      } else {
        alert("Failed to book room.");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
      <h1 className="text-center text-3xl font-extrabold mb-6">
        Search and Book Rooms
      </h1>
      <form className="space-y-6" onSubmit={searchAvailableRooms}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="start_date" className="mb-2 font-medium">
              Start Date
            </label>
            <input
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              type="date"
              id="start_date"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="flex flex-col">
            <label htmlFor="hotel_room_amount" className="mb-2 font-medium">
              Number of Rooms
            </label>
            <input
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              type="number"
              id="hotel_room_amount"
              value={searchParams.hotel_room_amount}
              onChange={(e) =>
                setSearchParams((prevState) => ({
                  ...prevState,
                  hotel_room_amount: e.target.value,
                }))
              }
              min="1"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label htmlFor="hotel_chain_name" className="mb-2 font-medium">
              Hotel Chain Name
            </label>
            <select
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={searchParams.hotel_chain_name}
              onChange={(e) =>
                setSearchParams((prevState) => ({
                  ...prevState,
                  hotel_chain_name: e.target.value,
                }))
              }
            >
              <option disabled value="">
                Select Hotel Chain
              </option>
              {hotelChainNames.map((hotelChainName) => (
                <option key={hotelChainName} value={hotelChainName}>
                  {hotelChainName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="hotel_category" className="mb-2 font-medium">
              Hotel Category
            </label>
            <select
              className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={searchParams.hotel_category}
              onChange={(e) =>
                setSearchParams((prevState) => ({
                  ...prevState,
                  hotel_category: e.target.value,
                }))
              }
            >
              <option disabled value="">
                Select Hotel Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col grow">
              <label htmlFor="min_room_price" className="mb-2 font-medium">
                Min $
              </label>
              <input
                className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                type="number"
                id="room_price"
                min={"80"}
                value={searchParams.min_room_price}
                onChange={(e) =>
                  setSearchParams((prevState) => ({
                    ...prevState,
                    min_room_price: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col grow">
              <label htmlFor="max_room_price" className="mb-2 font-medium">
                Max $
              </label>
              <input
                className="block w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                type="number"
                id="room_price"
                value={searchParams.max_room_price}
                onChange={(e) =>
                  setSearchParams((prevState) => ({
                    ...prevState,
                    max_room_price: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
        <button className="w-full bg-cyan-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
          Search Rooms
        </button>
      </form>

      {availableRooms.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
          <ul className="space-y-4">
            {availableRooms.map((room) => (
              <li
                key={`${room.id}-${room.room_num}`}
                className="p-4 bg-gray-800 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <p>Hotel: {room.hotel_name}</p>
                  <p>Room Number: {room.room_num}</p>
                  <p>Capacity: {room.capacity}</p>
                  <p>Price: ${room.price}</p>
                </div>
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => bookRoom(room.id, room.room_num)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    Book Room
                  </button>
                  <button
                    onClick={() => rentRoom(room.id, room.room_num)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    Rent Room
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomerRoomBooking;
