import express from 'express'
import { resolve } from 'path'

// local imports
import routes from './routes'

const app = express()

app.use(routes)

// JS Bundle
app.use("/build", express.static('build'))


app.all('*', (req, res) => {
  res.sendFile(resolve('./build/index.html'))
})

export default app