import { Login } from "../controllers/authController";

const express = require("express");

const auth_router = express.Router();
auth_router.post('/login', Login);

export default auth_router;