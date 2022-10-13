const express = require("express")
const cors = require("cors")
const app = express()

require("dotenv").config()

// useful to know where the app is started
const PORT = process.env.APP_PORT || process.env.NODE_DOCKER_PORT

// express middleware to enable CORS with various options
app.use(cors({ origin: "http://localhost:8081" }))

// body-parser middleware to parse requests of content-type application/json
app.use(express.json())

// body-parser middleware to parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// homepage route
app.get("/", (req, res) => {
  res.status(200)
  res.send("Welcome to Regent Competence Evening, fall 2022 🎉🎉🎉")
})

const db = require("./models")

// db.sequelize.sync({ force: true }) // to drop table and re-sync db during development
db.sequelize.sync()
.then(() => {
    console.log("Synced db.")
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message)
  })

require("./routes/consultants.routes")(app)

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

const server = app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

module.exports = server