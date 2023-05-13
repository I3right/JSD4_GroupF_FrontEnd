const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes.js");
const activityRoutes = require("./routes/activityRoutes.js");

const app = express();
app.use(express.json());

// test connection with server
app.get("/test", (req, res) => {
  res.send("it works");
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
