import resv_router from "./src/routes/reservationRoutes";
import auth_router from "./src/routes/authRouter";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', resv_router);
app.use('/api', auth_router);

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env["API_PORT"]}`);
});
