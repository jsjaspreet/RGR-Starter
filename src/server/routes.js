import express from 'express'
import graphqlHTTP from 'express-graphql'
import Schema from './schema'
import config from './config'
import pg from 'pg'
import pgConfigByEnv from '../../config/database/pg'

const nodeEnv = config.NODE_ENV

const pgPool = new pg.Pool(pgConfigByEnv[nodeEnv])

const router = express.Router()

// health check status
router.get('/api/status', (req, res) => res.status(200).json({ alive: true }))

// Graphql API
// graphql endpoints
router.use('/graphql', graphqlHTTP((req) => ({
  schema: Schema,
  context: { pgPool, req }
})))
router.use('/graphiql', graphqlHTTP((req) => ({
  schema: Schema,
  graphiql: true,
  context: { pgPool, req }
})))

export default router
