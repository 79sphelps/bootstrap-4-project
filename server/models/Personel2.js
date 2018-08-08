const mongoose = require("mongoose");
const Personel2Schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  editable: {
    type: Boolean,
    required: true
  }
});

const Personel2 = mongoose.model("Personel2", Personel2Schema);
module.exports = Personel2;
