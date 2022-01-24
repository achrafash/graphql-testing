// TODO - change the name of the file

const fs = require('fs')
const path = require('path')
const EasyGraphQLTester = require('easygraphql-tester')

const schemaCode = fs.readFileSync(
    path.join(__dirname, '..', 'schema.gql'),
    'utf-8'
)

describe('Queries', () => {
    let tester
    beforeAll(() => {
        tester = new EasyGraphQLTester(schemaCode)
    })

    test('Should pass with multiple queries', () => {
        const query = `
            query GET_USER($id: ID!){
                user(id: $id) {
                    id
                    firstname
                    lastname
                }
            }
        
        `
        tester.test(true, query, { id: '0' })
    })

    test('Should pass with nested queries', () => {
        const query = `
            query GET_USER_ASSETS($id: ID!){
                user(id: $id) {
                    id
                    assets{
                        id
                    }
                }
            }
        `
        tester.test(true, query, { id: '0' })
    })
})
