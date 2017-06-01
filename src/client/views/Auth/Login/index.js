import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  render() {
    return (
      <Paper zDepth={2}>
        <div>
          <TextField/>
          <TextField/>
        </div>
      </Paper>
    )

  }
}

export default Login