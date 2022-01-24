const fs = require('fs')
const path = require('path')
const db = require('../db')
const EasyGraphQLTester = require('easygraphql-tester')

const schemaCode = fs.readFileSync(
    path.join(__dirname, '..', 'schema.gql'),
    'utf-8'
)
const resolvers = require('../resolvers')

describe('Resolvers', () => {
    let tester
    beforeAll(() => {
        tester = new EasyGraphQLTester(schemaCode, resolvers)
    })

    it('Should return the right user with given id', async () => {
        const query = `
            query GET_USER($id: ID!) {
                user(id: $id) {
                    id
                    firstname
                    lastname
                }
            }
        `
        const args = { id: '0' }

        const result = await tester.graphql(query, undefined, { db }, args)
        expect(result.data.user.id).toBe(args.id)
        expect(result.data.user.firstname).toBe('Elon')
        expect(result.data.user.lastname).toBe('Musk')
    })

    it('Should return assets of the user with given id', async () => {
        const query = `
            query GET_USER_ASSETS($id: ID!) {
                user(id: $id) {
                    id
                    assets {
                        id
                    }
                }
            }
        `
        const args = { id: '0' }
        const result = await tester.graphql(query, undefined, { db }, args)
        expect(result.data.user.id).toBe(args.id)
        expect(result.data.user.assets).toBeInstanceOf(Array)
        expect(result.data.user.assets).toContainEqual({ id: '0' })
    })
})
