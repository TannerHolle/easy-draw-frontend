const mongoose = require('mongoose');

const CateogrySchema = new mongoose.Schema({
  costCode: Number,
  category: String,
  budget: Number,
})

const Category = mongoose.model('Category', CateogrySchema)

module.exports = { Category }
