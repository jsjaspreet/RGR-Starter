import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import Root from './index'
import environment from '../../util/relayEnvironment'

export default () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
           query rootContainerQuery {
             root {
               ...Root_root
             }
           }
         `}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        return <Root {...props} location={window.location.pathname}/>
      }
      return <div>Loading</div>
    }}
  />
)
