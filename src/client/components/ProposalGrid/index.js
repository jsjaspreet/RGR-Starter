import React, { Component } from 'react'
import StackGrid from 'react-stack-grid'
import { createFragmentContainer, graphql } from 'react-relay'
import styles from './styles'
import ProposalPreview from '../ProposalPreview'

class ProposalGrid extends Component {
  render() {
    const { root } = this.props
    // <div style={styles.containerStyle}>
    return (
      <StackGrid columnWidth={300}>
        {root.proposals.edges.map(edge => <ProposalPreview proposal={edge.node} key={edge.node.id}/>)}
      </StackGrid>
    )
  }
}

export default createFragmentContainer(
  ProposalGrid,
  graphql`
      fragment ProposalGrid_root on ProjectAPI {
          proposals(first: 99999) @connection(key: "ProposalGrid_proposals"){
              edges {
                  node {
                      ...ProposalPreview_proposal
                      id
                  }
              }
          }
      }
  `
)
