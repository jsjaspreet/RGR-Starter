import express from 'express'
import path from 'path'
import { resolve } from 'path'

// local imports
import routes from './routes'

const app = express()

app.use(routes)

// JS Bundle
app.use("/build", express.static('build'))
// Assets
app.use('/assets', express.static(path.join(__dirname, 'assets')))


app.all('*', (req, res) => {
  res.sendFile(resolve('./build/index.html'))
})

export default app