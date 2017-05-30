import jwt from 'jsonwebtoken'
import config from '../../../config'
import pgdb from '../../../database/pgdb'

const userFromContext = async context => {
  if (!context) {
    return null
  }

  // check if user has been pre-computed
  if (context.user) {
    return context.user
  }

  const cookies = context.cookies
  const cookie = cookies && cookies['idea-app']

  // cookie not found, return
  if (!cookie) {
    return null
  }


  // use the userId in the JWT to query for user against DB
  const { userId } = jwt.verify(cookie, config.JWT_SECRET)
  const { pgPool } = context
  const user = await pgdb(pgPool).getUserById({ id: userId })

  // set user to prevent unnecessary computation later on in the request
  context.user = user

  return user
}

export default userFromContext