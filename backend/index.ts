const express = require("express");
const pg = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { Client } = pg;
const client = new Client({
  host: process.env["DB_HOST"],
  user: process.env["DB_USER"],
  port: process.env["DB_PORT"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_NAME"],
});
const hashedPassword = bcrypt.hashSync(process.env["TEMP_ADMIN_PASSWORD"], 10);

try {
  client.connect().then(() => {
    console.log("Connected to the database");
  });
} catch (error) {
  console.error(`Error connecting to the database: ${error}`);
}

const AuthentaicateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env['JWT_SECRET'], (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const FormateTime = (time: string) => {
  const date = new Date(time);
  console.log(date.toISOString().replace('T', ' ').split('.')[0]);
  return date.toISOString().replace('T', ' ').split('.')[0];
}

// create a reservation
app.post("/api/reservation", async (req: any, res: any) => {
  try {

    // check if the room is already reserved or already checked
    const { room_id } = req.body;
    const check_query = "SELECT * FROM reservations WHERE room_id = $1 ORDER BY create_at DESC LIMIT 1";
    const check_values = [room_id];
    const check_result = await client.query(check_query, check_values);
    if(check_result.rows.length > 0 && (check_result.rows[0].is_pass === true || check_result.rows[0].is_checked === false)) {
        let error_message = "";
        if(check_result.rows[0].is_checked === false) {
            error_message = "此床號已被登記，請等待檢查。"
        } else if(check_result.rows[0].is_pass === true) {
            error_message = "此床號已通過檢查，無須再次檢查。"
        }
        res.status(400).json({ error: error_message });
        return;
    }

    // create a reservation
    const insert_query =
      "INSERT INTO reservations (room_id, is_checked, is_pass) VALUES ($1, $2, $3)";
    const insert_values = [room_id, false, false];
    const insert_result = await client.query(insert_query, insert_values);

    res.status(201).json(insert_result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// get all reservations
app.get("/api/query-all-reservations", async (req: any, res: any) => {
  try {
    const query = "SELECT * FROM reservations ORDER BY create_at DESC";
    const result = await client.query(query);
    
    const formatted_result = result.rows.map((row: any) => ({
      ...row,
      create_at: FormateTime(row.create_at)
    }));
    
    res.status(200).json(formatted_result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// update a reservation
app.post("/api/update-reservation", AuthentaicateToken, async (req: any, res: any) => {
  try {
    const { id, is_checked, is_pass, check_person } = req.body;
    const query =
      "UPDATE reservations SET is_checked = $1, is_pass = $2, check_person = $3 WHERE id = $4";
    const values = [is_checked, is_pass, check_person, id];
    const result = await client.query(query, values);

    res.status(200).json(result.rows[0]);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// login
app.post("/api/login", async (req: any, res: any) => {
  try {
    const { password } = req.body;
   
    const isMatch = bcrypt.compareSync(password, hashedPassword);

    /*
    const query = "SELECT * FROM users WHERE password = $1 LIMIT 1";
    const values = [password];
    const result = await client.query(query, values);
    */

    if (isMatch) {
      const token = jwt.sign({ role: "admin" }, process.env["JWT_SECRET"], { expiresIn: "1h" });
      res.status(200).json({ name: "vic", token });
    } else {
      res.status(401).json({ error: "密碼錯誤" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }

});

app.listen(process.env["API_PORT"], () => {
  console.log(`Server is running on port ${process.env["API_PORT"]}`);
});
