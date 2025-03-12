const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

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
      text: `INSERT INTO customers (government_id_type,government_id, first_name, last_name, street_number,street_name,registration_date) VALUES ('${req.body.government_id_type}','${req.body.government_id}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.street_number}', '${req.body.street_name}', '${req.body.registration_date}')`,
    };
    console.log(req.body);
    const post_response = await pool.query(query);
    //console.log("RESPONSE TO POST: ", post_response);
    //res.send("Post Successful");
  } catch (err) {
    console.error(err.message);
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
