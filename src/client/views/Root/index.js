import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import styles from './styles'
import Auth from '../Auth/container'

class App extends Component {
  render() {
    const currPath = window.location.pathname
    if (currPath === "/") {
      return <Redirect to="/login"/>
    }
    return (
      <div style={styles.container}>
        <Switch>
          <Route path="/login" component={Auth}/>
        </Switch>
      </div>
    )
  }
}

export default App