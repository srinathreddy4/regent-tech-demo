const db = require("../models")
const Consultant = db.consultants
const Op = db.Sequelize.Op

// Create and save a new consultant
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!"
    })
    return 
  }

  // Create a consultant
  const consultant = {
    name: req.body.name,
    skills: req.body.skills,
    assigned: req.body.assigned ? req.body.assigned : false
  }

  // Save consultant in the database
  Consultant.create(consultant)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the consultant."
      })
    })
}

// Retrieve all consultants filtered by name
exports.findByName = (req, res) => {
  const name = req.query.name
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null

  Consultant.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving consultants."
      })
    })
}

// Retrieve all consultants filtered by skills
exports.findBySkills = (req, res) => {
  // Validate request
  if (!req.body.skills) {
    res.status(400).send({
      message: "Skills can not be empty!"
    })
    return
  }

  const skills = req.body.skills
  const condition = skills ? { skills: { [Op.and]: skills }} : null

  Consultant.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving consultants."
      })
    })
}

// Find all assigned consultants
exports.findAllAssigned = (req, res) => {
  const condition = { assigned: true }

  Consultant.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving consultants."
      })
    })
}

// Update a consultant identified by the id in the request
exports.update = (req, res) => {
  const id = req.params.id
  const condition = { id: id } 

  Consultant.update(req.body, { where: condition })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Consultant was updated successfully."
        })
      } else {
        res.send({
          message: `Cannot update consultant with id=${id}. Maybe consultant was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating consultant with id=" + id
      })
    })
}

// Delete a consultant with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id
  const condition = { id: id } 

  Consultant.destroy({ where: condition })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Consultant was deleted successfully!"
        })
      } else {
        res.send({
          message: `Cannot delete Consultant with id=${id}. Maybe Consultant was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Consultant with id=" + id
      })
    })
}

// Delete all consultants from the database
exports.deleteAll = (req, res) => {
  const condition = {
    where: {},
    truncate: false
  }

  Consultant.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({ message: `${nums} consultants were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all consultants."
      })
    })
}