const express = require('express')
const graphqlHTTP = require('express-graphql')
const { GraphQLSchema, GraphQLString, GraphQLObjectType } = require('graphql')

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    widget: {
      type: GraphQLString, // 👀
      resolve: () => {
        return `select * from widgets limit 1;`
      },
    },
  }),
})

const server = express()

server.use(
  '/',
  graphqlHTTP({ schema: new GraphQLSchema({ query }), graphiql: true }),
)

server.listen(3000)
