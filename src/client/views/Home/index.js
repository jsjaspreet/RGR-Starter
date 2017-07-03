import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import ProposalGrid from '../../components/ProposalGrid'

class Home extends Component {
  render() {
    const { root } = this.props
    const greeting = `Welcome ${root.viewer.username}!`
    return (
      <div>
        <h1>{greeting}</h1>
        <ProposalGrid root={root}/>
      </div>
    )
  }
}

export default createFragmentContainer(
  Home,
  graphql`
      fragment Home_root on ProjectAPI {
          ...ProposalGrid_root
          viewer {
              id
              username
          }
      }
  `
)
