const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const app = express()

app.use(
    '/graphql',
    graphqlHTTP({
        schema: require('./typeDefs'),
        rootValue: require('./resolvers'),
        graphiql: true,
    })
)
app.listen(4000, () => {
    console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})
