const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    createdAt: String!
    assets: [Asset!]!
}

type Asset {
    id: ID!
    price: Float!
    title: String!
    description: String
    published: Boolean!
    owner: User!
}

type Query {
    user(id:ID!): User
    asset(id:ID!): Asset
    hello: String
}

type Mutation {
    createUser(email: String!, firstname: String!, lastname: String!): User
    createAsset(title: String!, uid: ID!, description: String!, price: Float!): Asset
    publishAsset(id: ID!): Asset
    transferAsset(sellerId: ID!, buyerId: ID!, assetId: ID!): Boolean
}  
`)
