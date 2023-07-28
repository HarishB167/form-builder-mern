require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const app = express();
app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
app.use(express.static("public"));

app.listen(3000);
