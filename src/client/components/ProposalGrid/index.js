import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import styles from './styles'
import ProposalPreview from '../ProposalPreview'

class ProposalGrid extends Component {
  render() {
    const { root } = this.props
    return (
      <div style={styles.containerStyle}>
        {root.proposals.edges.map(edge => <ProposalPreview proposal={edge.node} key={edge.node.id}/>)}
      </div>
    )
  }
}

export default createFragmentContainer(
  ProposalGrid,
  graphql`
      fragment ProposalGrid_root on ProjectAPI {
          proposals(first: 99999) {
              edges {
                  node {
                      ...ProposalPreview_proposal
                      id
                      proposal
                      createdAt
                  }
              }
          }
      }
  `
)
