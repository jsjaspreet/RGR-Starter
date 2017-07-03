import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import ProposalGrid from '../../components/ProposalGrid'
import CreateProposal from '../../components/CreateProposal'

class Home extends Component {

  render() {
    const { root } = this.props
    const greeting = `Welcome ${root.viewer.username}!`
    return (
      <div>
        <h1 style={{ marginLeft: 100, marginTop: 10, marginBottom: 10 }}>{greeting}</h1>
        <CreateProposal/>
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
