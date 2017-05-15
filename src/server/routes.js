import express from 'express'

const router = express.Router()

// health check status
router.get('/api/status', (req, res) => res.status(200).json({ alive: true }))

export default router
