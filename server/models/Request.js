"use strict";

const mongoose = require("mongoose");
const RequestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  editable: {
    type: Boolean,
    required: true
  }
});

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;
