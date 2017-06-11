import bcrypt from 'bcryptjs'
import pgdb from '../../database/pgdb'
import jwtForUser from './jwtForUser'

const BAD_CREDS = 'Incorrect email and/or Password'

async function authenticateUser({ username, password, pgPool }) {
  if (!username || !password) {
    throw new Error(BAD_CREDS)
  }

  const user = await pgdb(pgPool).getUserByUsername({ username })

  if (!user) {
    throw new Error(BAD_CREDS)
  }

  const passwordsMatch = await bcrypt.compare(password, user.password)

  if (!passwordsMatch) {
    throw new Error(BAD_CREDS)
  }

  Reflect.deleteProperty(user, 'password')

  return {
    user,
    token: jwtForUser(user)
  }
}

export default authenticateUser
