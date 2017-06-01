import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import styles from './styles'
import PropTypes from 'prop-types'

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  render() {
    return (
      <div style={styles.container}>
        <Paper zDepth={2}>
          <div style={styles.textFields}>
            <TextField id="username"/>
            <TextField id="pw"/>
          </div>
        </Paper>
      </div>
    )

  }
}

export default Login