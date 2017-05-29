import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { resolve } from 'path'

// local imports
import routes from './routes'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  secret: 'my-secret',
  saveUninitialized: true,
  resave: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

// JS Bundle
app.use("/build", express.static('build'))
// Assets
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.all('*', (req, res) => {
  res.sendFile(resolve('./build/index.html'))
})

export default app