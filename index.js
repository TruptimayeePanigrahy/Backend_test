const express = require("express");
const { connection } = require("./Utils/db");
const { userroute } = require("./Routes/userRoute");
const { schoolroute } = require("./Routes/schoolroute");
const { filterroute } = require("./Routes/filterroute");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use("/user", userroute);
app.use("/school", schoolroute);
app.use("/filter", filterroute);

app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
  console.log("server is running...");
});
