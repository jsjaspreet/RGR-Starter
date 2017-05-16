import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'
import { ApolloClient, ApolloProvider } from 'react-apollo'

const client = new ApolloClient()

const render = (Component) => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <AppContainer>
        <Component/>
      </AppContainer>
    </ApolloProvider>,
    document.getElementById('app')
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept()
}
