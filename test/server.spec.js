const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)
chai.should()

const server = require('../src/server')

describe('Server initialization', () => {
  it('Existing route should return 200', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        if (err) done(err)
        expect(res.status).to.equal(200)
        expect(res.text).to.equal('Welcome to Regent Competence Evening, fall 2022 🎉🎉🎉')
        done()
      })
  })

  it('Unexistant route should return 404', (done) => {
    chai
      .request(server)
      .get('/dsajdsajdkaskdal')
      .end((err, res) => {
        if (err) done(err)
        const { error } = res.body
        expect(res.status).to.equal(404)
        expect(error)
        expect(error).to.equal('Route not found')
        done()
      })
  })

  after(() => {
    server.close()
  })
})