const mongoose = require("mongoose");
const Echipament = require("../equipmentSchema");

const MobilePhone = Echipament.discriminator(
  "Telefon",
  new mongoose.Schema({
    simNo: { type: String, default: "" },
    simSn: { type: String, default: "" },
    imei: { type: String, default: "" },
  }),
);

module.exports = MobilePhone;
