const mysql = require("mysql2");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "data santri angkatan 23 yang masih di ponpes raudhatul irfan" ,
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;
