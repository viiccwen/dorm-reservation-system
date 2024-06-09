const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { Client } = pg;
const client = new Client({
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    port: process.env['DB_PORT'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
})

try {
    client.connect()
    .then(() => {
        console.log('Connected to the database');
    })
} catch ( error ) {
    console.error(`Error connecting to the database: ${error}`);
}

// create a reservation
app.post('/api/reservation', async (req: any, res: any) => {
    try {
        const { room_id } = req.body;
        const query = 'INSERT INTO reservations (room_id, is_checked, is_pass) VALUES ($1, $2, $3)';
        const values = [room_id, false, false];
        const result = await client.query(query, values);
        
        res.status(201).json(result.rows[0]);

    } catch ( error : any ) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(process.env['API_PORT'], () => {
    console.log(`Server is running on port ${process.env['API_PORT']}`);
})