import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql'

const User = new GraphQLObjectType({
  name: 'User',
  sqlTable: 'users',
  uniqueKey: 'id',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    username: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})

export default User
