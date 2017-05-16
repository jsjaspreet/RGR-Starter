import express from 'express'
import graphqlHTTP from 'express-graphql'
import Schema from './schema'

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
  graphiql: true
}))

export default router
