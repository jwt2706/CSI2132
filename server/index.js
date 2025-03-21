const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/availability/rooms", async (req, res) => {
  try {
    const {
      start_date,
      end_date,
      room_capacity,
      hotel_area,
      hotel_chain_name,
      hotel_category,
      hotel_room_amount,
      room_price,
    } = req.query;
    console.log(req.query);
    const query = {
      name: "fetch-available-rooms",
      text: `
            WITH date_series AS (SELECT * FROM generate_series($1,$2,'1 day'::interval) AS date_range), 
              num_rooms AS (SELECT h.hotel_name, COUNT(room_num) AS num_rooms
                    FROM rooms r
                    JOIN hotels h ON h.id = r.hotel_id
                    GROUP BY h.hotel_name)
            SELECT h.hotel_name, r.room_num, r.capacity, h.area, hc.hotel_chain_name, h.category, r.price
            FROM rooms r
            JOIN hotels h ON r.hotel_id = h.id
            JOIN hotelchains hc ON hc.id = h.hotel_chain_id
            JOIN roomavailabledates a ON r.hotel_id = a.hotel_id AND r.room_num = a.room_num
            JOIN date_series d ON d.date_range = a.room_available_date
            JOIN num_rooms n ON h.hotel_name = n.hotel_name
            WHERE (r.capacity = $3 OR $3 IS NULL)
              AND (h.area = $4 OR $4 IS NULL)
              AND (hc.hotel_chain_name = $5 OR $5 IS NULL) 
              AND (h.category = $6 OR $6 IS NULL)
              AND (r.price = $7 OR $7 IS NULL)
              AND (n.num_rooms = $8 OR $8 IS NULL)
            GROUP BY h.hotel_name, r.room_num, r.capacity, h.area, hc.hotel_chain_name, h.category, r.price
            HAVING COUNT(a.room_available_date) IN (SELECT COUNT(date_range) FROM date_series)`,
      values: [
        start_date,
        end_date,
        room_capacity,
        hotel_area,
        hotel_chain_name,
        hotel_category,
        room_price,
        hotel_room_amount,
      ],
    };

    const rooms = await pool.query(query);
    res.json(rooms.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// create room booking
app.put("/bookings", async (req, res) => {
  try {
    const { hotel_id, room_num, customer_id, start_date, end_date } = req.body;
    const query = {
      name: "new-room-booking",
      text: `INSERT INTO bookings (hotel_id, room_num, customer_id, start_date, end_date, status)
              VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [
        hotel_id,
        room_num,
        customer_id,
        start_date,
        end_date,
        "Confirmed",
      ],
    };
    const booking = await pool.query(query);
    res.json(booking.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete room booking
app.delete("/bookings/:booking_id", async (req, res) => {
  try {
    const { booking_id } = req.params;
    const query = {
      name: "delete-room-booking",
      text: `DELETE FROM Bookings WHERE id = $1`,
      values: [booking_id],
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

//create customer
app.put("/customers", async (req, res) => {
  try {
    const {
      government_id_type,
      government_id,
      first_name,
      last_name,
      street_number,
      street_name,
    } = req.body;
    const query = {
      name: "register-customer",
      text: `INSERT INTO customers (government_id_type, government_id, first_name, last_name, street_number, street_name, registration_date) 
            VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING *`,
      values: [
        government_id_type,
        government_id,
        first_name,
        last_name,
        street_number,
        street_name,
      ],
    };

    const put_response = await pool.query(query);
    console.log(put_response.rows[0]);

    res.status(201).json({
      message: "Customer created successfully",
      customer: put_response.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update customer information
app.patch("/customers/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const {
      government_id_type,
      government_id,
      first_name,
      last_name,
      street_number,
      street_name,
    } = req.body;
    const query = {
      name: "update-customer",
      text: `UPDATE customers
              SET government_id_type = COALESCE($2,government_id_type),
                  government_id = COALESCE($3,government_id),
                  first_name = COALESCE($4,first_name),
                  last_name = COALESCE($5,last_name),
                  street_number = COALESCE($6,street_number),
                  street_name = COALESCE($7,street_name)
              WHERE id = $1
              RETURNING *;
              `,
      values: [
        customer_id,
        government_id_type,
        government_id,
        first_name,
        last_name,
        street_number,
        street_name,
      ],
    };
    const patch_response = await pool.query(query);
    console.log(patch_response.rows[0]);
    res.status(200).json({
      message: "Customer updated successfully",
      customer: patch_response.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete customer
app.delete("/customers/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const query = {
      name: "delete-customer",
      text: `DELETE FROM customers WHERE id = $1`,
      values: [customer_id],
    };
    const delete_response = await pool.query(query);
    res.json(delete_response.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
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
