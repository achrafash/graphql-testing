const fs = require('fs')
const path = require('path')
const EasyGraphQLTester = require('easygraphql-tester')

const schemaCode = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'schema.gql'),
    'utf-8'
)

describe('Queries', () => {
    let tester
    beforeAll(() => {
        tester = new EasyGraphQLTester(schemaCode)
    })

    test('Should pass with nested queries', () => {
        const query = `
            query GET_FRIENDS($userId: ID!){
                user(id: $userId) {
                    id
                    friends {
                        id
                        firstname
                        lastname
                    }
                }
            }
        `
        tester.test(true, query, { userId: '0' })
    })
})
