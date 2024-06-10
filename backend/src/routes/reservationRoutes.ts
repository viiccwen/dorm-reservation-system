const express = require("express");
import { CreateReservation, GetAllReservations, UpdateReservation }  from "../controllers/reservationController";

const resv_router = express.Router();

resv_router.post('/reservation', CreateReservation);
resv_router.get('/query-all-reservations', GetAllReservations);
resv_router.post('/update-reservation', UpdateReservation);

export default resv_router;