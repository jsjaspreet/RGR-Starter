import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { User } from '../../types'
import { authenticateUser } from '../../../util/index'

const LoginInput = new GraphQLInputObjectType({
  name: 'LoginInput',
  fields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  }
})

const LoginMutation = {
  type: User,
  args: {
    input: { type: new GraphQLNonNull(LoginInput) }
  },
  resolve: async (obj, { input }, { pgPool }) => {
    const { username, password } = input
    const { user, token } = await authenticateUser({ username, password, pgPool })
    return user
  }
}

export default LoginMutation
