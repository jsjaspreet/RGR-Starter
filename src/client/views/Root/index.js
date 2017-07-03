import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { Switch, Route, Redirect } from 'react-router-dom'
import styles from './styles'
import Auth from '../Auth/authContainer'
import Home from '../Home'
import Chrome from '../../components/Chrome'

class App extends Component {
  render() {
    const { root } = this.props
    const loggedIn = Boolean(root.viewer)
    return (
      <div style={styles.container}>
        { loggedIn && <Chrome />}
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return loggedIn ? <Redirect to="/home"/> : <Redirect to="/login"/>
            }}
          />
          <Route path="/login" component={Auth}/>
          <Route path="/home" render={() => <Home root={root}/>}/>
        </Switch>
      </div>
    )
  }
}

export default createFragmentContainer(
  App,
  graphql`
      fragment Root_root on ProjectAPI {
          ...Home_root
          viewer {
              id
              email
              username
          }
      }
  `
)

