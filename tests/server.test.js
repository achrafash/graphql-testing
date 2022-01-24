const app = require('../app')
const request = require('supertest')

app.server = app.listen(5000)

describe('Server is running', () => {
    afterEach(() => app.server.close())
    it('Should listen to HTTP requests', () => {
        return request(app)
            .post('/graphql')
            .expect('Content-Type', /application\/json/)
            .expect(400)
    })
})
