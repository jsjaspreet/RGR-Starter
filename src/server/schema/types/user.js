import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql'

const User = new GraphQLObjectType({
  name: 'User',
  sqlTable: 'users',
  uniqueKey: 'user_id',
  fields: () => ({
    id: {
      type: GraphQLID,
      sqlColumn: 'user_id'
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
