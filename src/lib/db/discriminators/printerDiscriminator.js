const mongoose = require("mongoose");
const Echipament = require("../equipmentSchema");

const Printer = Echipament.discriminator(
  "Imprimanta",
  new mongoose.Schema({
    firmwarePass: { type: String, default: "" },
    tonerModel: { type: String, default: "" },
    drumModel: { type: String, default: "" },
  }),
);

module.exports = Printer;
