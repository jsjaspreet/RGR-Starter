import React, { Component } from 'react'
import styles from './styles'
import Auth from '../Auth'
import environment from '../../util/relayEnvironment'
import { QueryRenderer, graphql } from 'react-relay'

class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <QueryRenderer
          environment={environment}
          query={graphql`
           query RootQuery {
             root {
               ...Auth_root
             }
           }
         `}
          render={({ error, props }) => {
            if (error) {
              return <div>{error.message}</div>
            } else if (props) {
              return <Auth {...props} />
            }
            return <div>Loading</div>
          }}
        />
      </div>
    )
  }
}

export default App