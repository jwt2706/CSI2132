const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// General GET on any table
app.get("/:table", async (req, res) => {
  try {
    const table = req.params.table;
    const query = `SELECT * FROM ${table}`;
    console.log("in get", table);
    const allRows = await pool.query(query);
    res.json(allRows.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// check availability of rooms
app.get("/availability/rooms", async (req, res) => {
  try {
    const { start_date, end_date, capacity, area, hotel_chain_name, hotel_category, num_rooms, price_min, price_max } = req.body;
    const query = {
      name: "fetch-rooms-available",
      text: `WITH date_series AS (
                SELECT generate_series($1::date, $2::date, '1 day'::interval) AS date
              )
              SELECT h.hotel_name, r.room_num, r.capacity, hc.hotel_chain_name, h.category, h.area, r.price
              FROM rooms r
              JOIN hotels h ON r.hotel_id = h.id
              JOIN hotelchains hc ON hc.id = h.hotel_chain_id
              JOIN roomavailabledates a ON r.hotel_id = a.hotel_id AND r.room_num = a.room_num
              JOIN date_series ds ON ds.date = a.room_available_date
              WHERE r.capacity >= $3 AND h.area = $4 AND hc.hotel_chain_name = $5 AND h.category = $6
              GROUP BY h.hotel_name, r.room_num, r.capacity, hc.hotel_chain_name, h.category, h.area, r.price
              HAVING COUNT(DISTINCT a.room_available_date) = (SELECT COUNT(*) FROM date_series) AND COUNT(r.room_num) >= $7 AND r.price BETWEEN $8 AND $9`,
      values: [start_date, end_date, capacity, area, hotel_chain_name, hotel_category, num_rooms, price_min, price_max],
    };
    const rooms = await pool.query(query);
    console.log(rooms);
    res.json(rooms.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// create room booking
app.put("/hotels/:hotel_id/rooms/:room_num/book", async (req, res) => {
  try {
    const { hotel_id, room_num } = req.params;
    const { customer_id, start_date, end_date } = req.body;
    const query = {
      name: "book-room",
      text: `INSERT INTO bookings (hotel_id, room_num, customer_id, start_date, end_date, status)
              VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [hotel_id, room_num, customer_id, start_date, end_date, "Confirmed"],
    };
    const booking = await pool.query(query);
    res.json(booking.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/hotels/:id", async (req, res) => {
  try {
    const query = {
      name: "fetch-hotel",
      text: "SELECT * FROM hotels WHERE id = $1",
      values: [req.params.id],
    };
    const Hotels = await pool.query(query);
    res.json(Hotels.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/customers", async (req, res) => {
  try {
    const query = {
      name: "register-customer",
      text: `INSERT INTO customers (government_id_type, government_id, first_name, last_name, street_number, street_name, registration_date) 
            VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING *`,
      values: [req.body.government_id_type, req.body.government_id, req.body.first_name, req.body.last_name, req.body.street_number, req.body.street_name],
    };

    const post_response = await pool.query(query);
    console.log(post_response.rows[0]); // Log the newly created customer

    res.status(201).json({
      message: "Customer created successfully",
      customer: post_response.rows[0], // Return the newly created customer
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" }); // Return an error response
  }
});

// app.post("/hotels", async (req, res) => {
//   try {
//     const { hotel_chain_id, street_number, street_name, num_rooms, email, stars } = req.body;
//     const newHotel = await pool.query("INSERT INTO Hotels (hotel_chain_id, street_number, street_name, num_rooms, email, stars) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [
//       hotel_chain_id,
//       street_number,
//       street_name,
//       num_rooms,
//       email,
//       stars,
//     ]);

//     res.json(newHotel.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

app.listen(8080, () => {
  console.log("server has started on port 8080");
});
