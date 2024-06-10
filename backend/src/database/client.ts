const pg = require("pg");
const { Client } = pg;

const client = new Client({
  host: process.env["DB_HOST"],
  user: process.env["DB_USER"],
  port: process.env["DB_PORT"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_NAME"],
});

client
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error: any) => {
    console.error("Failed to connect to the database, ", error);
  });

export default client;