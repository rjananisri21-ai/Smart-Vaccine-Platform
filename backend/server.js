const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/vaccineDB"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Vaccine = mongoose.model("Vaccine", {
  name: String,
  quantity: Number,
  expiryDate: String
});

app.get("/", (req, res) => {
  res.send("Smart Vaccine Platform Backend Running");
});

app.get("/api/vaccines", async (req, res) => {
  const vaccines = await Vaccine.find();
  res.json(vaccines);
});

app.post("/api/vaccines", async (req, res) => {
  const vaccine = await Vaccine.create(req.body);
  res.json(vaccine);
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});