require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const database = require("./database");
const hotelModel = require("./models/hotel-model");
const router = require('./routes')
const cookieParser = require('cookie-parser');
database();
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
