const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql')

const WIDGET = new GraphQLEnumType({
  name: 'WIDGET',
  values: {
    RED_WIDGET: { value: 'red-widget' },
    GREEN_WIDGET: { value: 'green-widget' },
    BLUE_WIDGET: { value: 'blue-widget' },
  },
})

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    widget: {
      type: GraphQLString,
      args: {
        name: {
          description: 'The id of the widget',
          type: new GraphQLNonNull(WIDGET),
        },
      },
      resolve: (_source, { name }) => {
        return `select * from widgets where name = '${name}';`
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
