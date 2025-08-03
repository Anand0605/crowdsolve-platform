const mongoose = require('mongoose');
const problemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: String,
  image: String,
  description: String,
}, { timestamps: true });
module.exports = mongoose.model('Problem', problemSchema);
