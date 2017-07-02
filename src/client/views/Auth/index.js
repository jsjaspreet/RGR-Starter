import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import styles from './styles'
import Login from './Login'

class Auth extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Login/>
      </div>
    )
  }
}

export default createFragmentContainer(
  Auth,
  graphql`
      fragment Auth_root on ProjectAPI {
          users(first: 999) {
              edges {
                  node {
                      id
                      email
                      username
                  }
              }
          }
      }
  `
)

