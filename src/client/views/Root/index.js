import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { Switch, Route, Redirect } from 'react-router-dom'
import styles from './styles'
import Auth from '../Auth/authContainer'
import Home from '../Home'
import ProposalDetails from '../ProposalDetails'
import Chrome from '../../components/Chrome'

class App extends Component {
  render() {
    const { root, location } = this.props
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
          <Route path="/login" render={() => {
            return loggedIn ? <Redirect to="/home"/> : <Auth/>
          }}/>
          <Route path="/home" render={() => {
            return loggedIn ? <Home root={root}/> : <Redirect to="/login"/>
          }}/>
          <Route path="/proposal/:proposalSlug" render={(matchProps) => {
            const { match } = matchProps
            const { proposalSlug } = match.params
            return loggedIn ? <ProposalDetails proposalSlug={proposalSlug} root={root}/> : <Redirect to="/login"/>
          }}/>
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
          ...Auth_root
          ...ProposalDetails_root
          viewer {
              id
              email
              username
          }
      }
  `
)

