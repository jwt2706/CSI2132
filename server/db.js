const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 8081,
  database: "EHotelDB",
});

module.exports = pool;
