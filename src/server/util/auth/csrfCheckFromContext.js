import config from '../../config'

export const csrfCheckFromContext = ({ req }) => {
  if (!req) {
    throw new Error('No context was passed to csrf check')
  }

  // Ignore CSRF check for the graphiql endpoint for local dev only
  const { headers: { referer } } = req
  if (referer && referer.includes('graphiql?') && config.NODE_ENV === 'development') {
    return true
  }

  const { cookies, headers } = req
  const csrfSecret = cookies && cookies['_csrf']
  const csrfToken = headers && headers['csrf-token']

  if (!csrfSecret) {
    throw new Error('No CSRF key was found!')
  }

  if (!csrfToken) {
    throw new Error('No CSRF token was found!')
  }

  if (csrfSecret !== csrfToken) {
    throw new Error('CSRF token was invalid!')
  }

  return true
}
