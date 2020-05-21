const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql')

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    widget: {
      type: GraphQLString,
      args: {
        id: {
          description: 'The id of the widget',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_source, { id }) => {
        //                                    SQL injection!
        return `select * from widgets where id = '${id}';`
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
