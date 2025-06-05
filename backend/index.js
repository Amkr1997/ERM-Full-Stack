const express = require("express");
// const connectDB = require("./db/db.connect");
require("dotenv").config({ path: "./.env" });

// connectDB();

const app = express();
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  openSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => res.send("Express Server is running!"));

app.use("/api/project", require("./routes/project.route"));
app.use("/api/assignment", require("./routes/assignment.route"));
app.use("/api/user", require("./routes/user.route"));

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log("Server started on port 3000"));
