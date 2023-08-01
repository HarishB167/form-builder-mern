const mongoose = require("mongoose");

const formBuilderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

module.exports = mongoose.model("FormBuilder", formBuilderSchema);
