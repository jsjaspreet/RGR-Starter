import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { fromGlobalId } from 'graphql-relay'

class ProposalOwner extends Component {

  render() {
    const { children, proposal: { userId: proposalUserId }, viewer: { id: globalUserId } } = this.props
    const { id: viewerId } = fromGlobalId(globalUserId)
    const isOwner = proposalUserId === viewerId
    if (!isOwner) {
      return null
    }
    return children
  }

}

export default createFragmentContainer(
  ProposalOwner,
  {
    proposal: graphql`
        fragment ProposalOwner_proposal on Proposal {
            userId
        }
    `,
    viewer: graphql`
        fragment ProposalOwner_viewer on User {
            id
        }
    `
  }
)
