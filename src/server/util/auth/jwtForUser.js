import jwt from 'jsonwebtoken'
import config from '../../config'
export default user => jwt.sign({ userId: user.id }, config.JWT_SECRET)