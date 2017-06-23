import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import { nodeInterface } from '../definitions'
import { globalIdField } from 'graphql-relay'

const User = new GraphQLObjectType({
  name: 'User',
  sqlTable: 'users',
  uniqueKey: 'id',
  fields: () => ({
    id: {
      description: 'The global ID for the Relay spec',
      ...globalIdField(),
      sqlDeps: ['id']
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    username: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }),
  interfaces: () => [nodeInterface]
})

export default User
