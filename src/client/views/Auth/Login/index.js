import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import styles from './styles'
import autobind from 'autobind-decorator'
import Cookie from 'js-cookie'
import { commitMutation, graphql } from 'react-relay'
import environment from '../../../util/relayEnvironment'
import PropTypes from 'prop-types'

const mutation = graphql`
    mutation LoginMutation($input: LoginInput!) {
        Login(input: $input) {
            token
        }
    }
`

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  @autobind
  login() {
    const { username, password } = this.state
    const variables = {
      input: {
        username,
        password
      }
    }
    commitMutation(
      environment,
      {
        mutation,
        variables,
        onCompleted: ({ Login }) => {
          const { token } = Login
          Cookie.set('pulse-app', token)
          location.reload()
        },
        onError: err => console.log(err)
      }
    )
  }

  render() {
    return (
      <div style={styles.container}>
        <Paper style={styles.paperContainer} zDepth={2}>
          <div style={styles.content}>
            <div style={styles.textFields}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FontAwesome name="user" size="2x" style={{ width: 32 }}/>
                <TextField onChange={(event, username) => this.setState({ username })}
                           style={styles.textField}
                           id="username"/>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FontAwesome name="key" size="2x"/>
                <TextField onChange={(event, password) => this.setState({ password })}
                           style={styles.textField}
                           type="password" id="pw"/>
              </div>
            </div>
            <RaisedButton style={styles.signInBtn} onClick={this.login} label="Sign In" primary/>
          </div>
        </Paper>
      </div>
    )

  }
}

export default Login