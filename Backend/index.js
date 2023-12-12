const express = require("express");
const { connection } = require("./config/db.js");
const { userRoutes } = require("./routes/user.routes.js");
const { doubtRoutes } = require("./routes/doubt.routes.js");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/doubt', doubtRoutes);

const port = process.env.port || 3000;

app.listen(port, async () => {
  try {
    await connection;
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${port}`);
});
