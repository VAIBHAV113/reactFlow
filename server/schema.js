const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = Schema({
  position: {
    type: String,
    unique: true
  },
});
module.exports = mongoose.model("Article", PositionSchema);
