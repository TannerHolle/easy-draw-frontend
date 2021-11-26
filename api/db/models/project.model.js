const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: String,
  address: String,
  homeOwners: String,
  phone: String,
  email: String,
  budget: Number,
  categories: [],
  draws: [],
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = { Project }
