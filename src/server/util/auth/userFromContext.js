// external imports
import jwt from 'jsonwebtoken'
// local imports
import config from '../../config'
import pgdb from '../../database/pgdb'

const userFromContext = async context => {
  if (!context) {
    return null
  }

  // if we have already computed the user in this context
  if (context.user) {
    // then return the value
    return context.user
  }

  const { req, pgPool } = context

  // otherwise we haven't computed the value yet
  const cookies = req.cookies || null
  let cookieVal = cookies && cookies['pulse-app']
  if (!cookieVal) {
    cookieVal = req.headers['pulse-app']
  }

  // if we can't find the id of the given user
  if (!cookieVal) {
    // don't return a user
    return null
  }

  // grab the id for the appropriate user from the jwt
  const { userId: id } = jwt.verify(cookieVal, config.JWT_SECRET)

  // get user from database
  const user = await pgdb(pgPool).getUserById({ id })

  // save the user we just pulled
  context.user = user

  return user
}

export default userFromContext
