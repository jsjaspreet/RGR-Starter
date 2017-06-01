import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import RaisedButton from 'material-ui/RaisedButton';
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
        <Paper style={styles.paperContainer} zDepth={2}>
          <div style={styles.content}>
            <div style={styles.textFields}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FontAwesome name="user" size="2x" style={{ width: 32 }}/>
                <TextField style={styles.textField} id="username"/>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FontAwesome name="key" size="2x"/>
                <TextField style={styles.textField} type="password" id="pw"/>
              </div>
            </div>
            <RaisedButton style={styles.signInBtn} label="Sign In" primary/>
          </div>
        </Paper>
      </div>
    )

  }
}

export default Login