import React, { Component } from 'react'
import styles from './styles'
import Auth from '../Auth/container'

class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Auth/>
      </div>
    )
  }
}

export default App