import React, { Component } from 'react'
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

export default Auth