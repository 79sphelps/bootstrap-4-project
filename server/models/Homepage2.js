const mongoose = require("mongoose");
const Homepage2Schema = mongoose.Schema({
  welcomeMsg: {
    type: String,
    required: true
  },
  aboutMsg: {
    type: String,
    required: true
  },
  aboutQuote: {
    type: String,
    required: true
  },
  personHighlight: {
    type: String,
    required: true
  },
  personHighlightQuote: {
    type: String,
    required: true
  },
  personHighlightBio: {
    type: String,
    required: true
  },
  personHighlightThumbnail: {
    type: String,
    required: true
  },
  personHighlightThumbnailCaption: {
    type: String,
    required: true
  },
  editable: {
    type: Boolean,
    required: true
  }
});

const Homepage2 = mongoose.model("Homepage2", Homepage2Schema);
module.exports = Homepage2;
