const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = { Project }
