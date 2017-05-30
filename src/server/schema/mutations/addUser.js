import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import bcrypt from 'bcryptjs'
import { User } from '../types'
import pgdb from '../../database/pgdb'

const UserInput = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  }
})

const UserMutation = {
  type: User,
  args: {
    input: { type: new GraphQLNonNull(UserInput) }
  },
  resolve: async (obj, { input }, { pgPool }) => {
    const { email, username, password } = input
    // hash the password before saving
    const hash = await bcrypt.hash(password, 10)
    return pgdb(pgPool).addUser({ email, username, password: hash })
  }
}

export default UserMutation

