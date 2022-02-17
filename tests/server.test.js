const app = require('../src/app')
const request = require('supertest')

app.server = app.listen(5000)

describe('Server', () => {
    afterEach(() => app.server.close())

    it('Should listen to HTTP requests', (done) => {
        const userId = '0'
        request(app)
            .post('/graphql')
            .send({
                query: `{ user(id: ${userId}) { id, friends{ id } }  }`,
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body && typeof res.body === 'object').toBe(true)
                expect(res.body).toHaveProperty('data')
                expect(res.body.data).toHaveProperty('user')
                expect(res.body.data.user).toHaveProperty('id')
                expect(res.body.data.user.id).toBe(userId)

                expect(res.body.data.user).toHaveProperty('friends')
                expect(res.body.data.user.friends).toContainEqual({ id: '1' })
                return done()
            })
    })
})
