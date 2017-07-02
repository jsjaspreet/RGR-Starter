import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import Auth from './index'
import environment from '../../util/relayEnvironment'

export default () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
           query authContainerQuery {
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
)