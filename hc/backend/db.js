const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user:"root",
  password: "Soni@1820",
  database: "manhaasapp",
});

db.connect((err) => {
    if (err) {
      console.error("Database connection failed: " + err.stack);
      return;
    }
    console.log("Connected to MySQL");
  });

module.exports = db;