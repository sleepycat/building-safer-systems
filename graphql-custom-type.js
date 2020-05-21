const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLError,
  GraphQLNonNull,
} = require('graphql')

const AlphabeticString = new GraphQLScalarType({
  name: 'AlphabeticString',
  description: 'represents a string with no special characters.',
  serialize: String,
  parseValue: value => {
    if (value.match(/^([A-Za-z]|\s)+$/)) {
      return value
    } else {
      throw new GraphQLError(
        'AlphabeticString can only contain A-Za-z and spaces',
      )
    }
  },
  parseLiteral: ast => {
    if (ast.value.match(/^([A-Za-z]|\s)+$/)) {
      return ast.value
    } else {
      throw new GraphQLError(
        'AlphabeticString can only contain A-Za-z and spaces',
      )
    }
  },
})

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    widget: {
      type: GraphQLString,
      args: {
        name: {
          description: 'The name of the widget',
          type: new GraphQLNonNull(AlphabeticString),
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
