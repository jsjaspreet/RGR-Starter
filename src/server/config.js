const config = Object.freeze({
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  PORT: process.env.PORT || 8001,
})

export default config
