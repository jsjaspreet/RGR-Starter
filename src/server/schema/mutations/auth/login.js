import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { UserType } from '../../types'
import { authenticateUser, csrfCheckFromContext } from '../../../util'

const loginMutation = mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    user: { type: UserType },
    token: { type: GraphQLString }
  },
  mutateAndGetPayload: async ({ username, password }, context) => {
    csrfCheckFromContext(context)
    const { pgPool } = context
    const { user, token } = await authenticateUser({ username, password, pgPool })
    return { user, token }
  }
})

export default loginMutation
