import config from './config'
import app from './app'

app.listen(config.PORT, () => {
  console.log(`App running in ${config.NODE_ENV} mode on port ${config.PORT}`)
})