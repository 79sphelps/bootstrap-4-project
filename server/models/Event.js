// server/models/Event.js
/*
 |--------------------------------------
 | Event Model
 |--------------------------------------
 */

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  groupSize: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  purpose: String,
  description: String,
  viewPublic: {
    type: Boolean,
    required: true
  },
  editable: {
    type: Boolean,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Event", eventSchema);
