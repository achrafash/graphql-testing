const fs = require('fs')
const path = require('path')
const db = require('../src/db')
const EasyGraphQLTester = require('easygraphql-tester')
const getFriends = require('../src/getFriends')

const schemaCode = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'schema.gql'),
    'utf-8'
)
const resolvers = require('../src/resolvers')

describe('Resolvers', () => {
    let tester
    beforeAll(() => {
        tester = new EasyGraphQLTester(schemaCode, resolvers)
    })

    it('Should get friends of user from their id', () => {
        // unit testing the Javascript function
        const userId = 0
        const friends = getFriends(db, userId)

        expect(friends.length).toBe(1)
        expect(friends[0]).toHaveProperty('id')
        expect(friends[0]).toHaveProperty('firstname')
        expect(friends[0].firstname).toBe('Eduardo')
    })

    it('Should return friends of the user with given id', async () => {
        // integration test of the query
        const query = `
            query GET_FRIENDS($userId: ID!) {
                user(id: $userId) {
                    id
                    friends {
                        id
                    }
                }
            }
        `
        const args = { userId: '0' }
        const result = await tester.graphql(query, undefined, { db }, args)

        expect(result.data.user.id).toBe(args.userId)
        expect(result.data.user.friends).toBeInstanceOf(Array)
        expect(result.data.user.friends).toContainEqual({ id: '1' })
    })
})
