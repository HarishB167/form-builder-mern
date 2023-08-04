require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

let cors_origins = process.env.CORS_ORIGINS;
cors_origins = cors_origins.split(";");
const origins = { origin: cors_origins };
console.log("Allowed origins (CORS_ORIGINS) are : ", origins);

const app = express();
app.use(cors(origins));

app.use(express.json({ limit: "50mb" }));

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
const formBuilderRouter = require("./routes/formBuilder");
app.use("/formBuilder", formBuilderRouter);
const formFillRouter = require("./routes/formFill");
app.use("/formFill", formFillRouter);
app.use(express.static("public"));

app.listen(3000);
