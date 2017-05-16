import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Hello World!!</h1>
      </div>
    )
  }
}

const query = gql`query { name }`

export default graphql(query)(App)
