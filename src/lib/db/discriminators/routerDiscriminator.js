const mongoose = require("mongoose");
const Echipament = require("../equipmentSchema");

const Router = Echipament.discriminator(
  "Router",
  new mongoose.Schema({
    ssid: { type: String, default: "" },
    pass: { type: String, default: "" },
  }),
);

module.exports = Router;
