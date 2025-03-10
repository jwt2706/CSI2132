const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/hotels", async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (err) {
    console.error(err.message);
  }

  //   try {
  //     const allHotels = await pool.query("SELECT * FROM Hotels");
  //     res.json(Hotels.rows);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
});

app.listen(8080, () => {
  console.log("server has started on port 8080");
});
