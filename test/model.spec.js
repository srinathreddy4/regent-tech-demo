const ConsultantsModel = require('../src/models/consultants.model')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
  checkNonUniqueIndex,
} = require('sequelize-test-helpers')

describe('src/models/consultants.model', () => {
  const Model = ConsultantsModel(sequelize, dataTypes)
  const consultant = new Model()

  context('name', () => {
    checkModelName(Model)('consultant')
  })

  context('properties', () => {
    ['name', 'skills', 'assigned'].forEach(checkPropertyExists(consultant))
  })

  context('indexes', () => {
    ['name', 'assigned'].forEach(checkNonUniqueIndex(consultant))
  })
})
