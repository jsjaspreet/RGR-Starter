import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { Switch, Route, Redirect } from 'react-router-dom'
import styles from './styles'
import Auth from '../Auth/authContainer'

class App extends Component {
  render() {
    console.log("root props", this.props)
    const loggedIn = false
    return (
      <div style={styles.container}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return loggedIn ? <Redirect to="/home"/> : <Redirect to="/login"/>
            }}
          />
          <Route path="/login" component={Auth}/>
        </Switch>
      </div>
    )
  }
}

export default createFragmentContainer(
  App,
  graphql`
    fragment Root_root on ProjectAPI {
        viewer {
            id
            email
            username
        }
    }
  `
)

