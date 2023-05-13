const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes.js");
const activityRoutes = require("./routes/activityRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// test connection with server
app.get("/test", (req, res) => {
  res.json({message:"it works"});
});

app.use("/users", userRoutes);
app.use("/activities", activityRoutes);

const start = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    })
    .then(() => console.log("Connected"))
    .catch((error) => console.log(error));

    app.listen(process.env.PORT, () => {
      console.log(`SERVER is running`);
    });
};


start();
