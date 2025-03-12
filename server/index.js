const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/:table", async (req, res) => {
  console.log("in get");
  try {
    const { table } = req.params;
    const allRows = await pool.query(`SELECT * FROM ${table}`);
    res.json(allRows.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// app.get("/hotels/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const Hotels = await pool.query("SELECT * FROM Hotels WHERE id = $1", [id]);
//     res.json(Hotels.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

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
