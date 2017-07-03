import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

class Home extends Component {
  render() {
    const { root } = this.props
    const greeting = `Welcome ${root.viewer.username}!`
    return (
      <h1>{greeting}</h1>
    )
  }
}

export default createFragmentContainer(
  Home,
  graphql`
    fragment Home_root on ProjectAPI {
        viewer {
            id
            username
        }
    }
  `
)
