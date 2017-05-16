import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'

const rootQuery = new GraphQLObjectType({
  name: 'ProjectAPI',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => "Project GraphQL API"
    }
  })
})

export default rootQuery
