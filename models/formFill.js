const mongoose = require("mongoose");

const formFillSchema = new mongoose.Schema({
  formId: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

module.exports = mongoose.model("FormFill", formFillSchema);
