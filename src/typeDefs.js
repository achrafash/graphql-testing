const fs = require('fs')
const path = require('path')
const { buildSchema } = require('graphql')

module.exports = buildSchema(
    fs.readFileSync(path.join(__dirname, 'schema.gql'))
)
