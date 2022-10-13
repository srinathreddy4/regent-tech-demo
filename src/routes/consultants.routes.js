module.exports = app => {
  const consultants = require("../controllers/consultants.controller.js")
  const router = require("express").Router()

  // Create a new consultant
  router.post("/", consultants.create)

  // Retrieve all consultants by skills
  router.post("/skills", consultants.findBySkills)

  // Retrieve all consultants by name
  router.get("/", consultants.findByName)

  // Retrieve all assigned consultants
  router.get("/assigned", consultants.findAllAssigned)

  // Update a consultant with id
  router.put("/update/:id", consultants.update)

  // Delete a consultant with id
  router.delete("/delete/:id", consultants.delete)

  // Delete all consultants
  router.delete("/", consultants.deleteAll)

  app.use('/api/consultants', router)
}