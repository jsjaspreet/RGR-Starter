import express from 'express'
import graphqlHTTP from 'express-graphql'
import Schema from './schema'
import util from './util'
import pg from 'pg'
import pgConfigByEnv from '../../config/database/pg'

const nodeEnv = util.nodeEnv

const pgPool = new pg.Pool(pgConfigByEnv[nodeEnv])

const router = express.Router()

// health check status
router.get('/api/status', (req, res) => res.status(200).json({ alive: true }))

// Graphql API
// graphql endpoints
router.use('/graphql', graphqlHTTP({
  schema: Schema,
}))
router.use('/graphiql', graphqlHTTP({
  schema: Schema,
  graphiql: true,
  context: { pgPool }
}))

export default router
