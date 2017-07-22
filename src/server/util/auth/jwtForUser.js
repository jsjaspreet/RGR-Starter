import jwt from 'jsonwebtoken'
import uuid from 'uuid'
import config from '../../config'
export default user => jwt.sign({
  userId: user.id,
  jti: uuid.v4(),
  iat: Math.floor((new Date()).getTime() / 1000)
}, config.JWT_SECRET)