import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import bcrypt from 'bcryptjs'
import { mutationWithClientMutationId } from 'graphql-relay'
import { UserType } from '../types'
import pgdb from '../../database/pgdb'

const createUserMutation = mutationWithClientMutationId({
  name: 'CreateUser',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    user: { type: UserType }
  },
  mutateAndGetPayload: async ({ email, username, password }, { pgPool }) => {
    // hash the password before saving
    const hash = await bcrypt.hash(password, 10)
    const user = pgdb(pgPool).addUser({
      username,
      email: email.toLowerCase(),
      password: hash
    })
    return { user }
  }
})

export default createUserMutation

