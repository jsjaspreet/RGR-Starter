import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import StackGrid from 'react-stack-grid'
import Reaction from '../Reaction'
import styles from './styles'

class Reactions extends Component {
  render() {
    const { proposal } = this.props
    const { reactions } = proposal
    if (reactions.edges.length === 0) {
      return <h1 style={styles.noReactionsText}>No Reactions !</h1>
    }
    return (
      <StackGrid
        gutterWidth={8}
        gutterHeight={8}
        columnWidth={300}>
        {reactions.edges.map(edge => <Reaction reaction={edge.node} key={edge.node.id}/>)}
      </StackGrid>
    )
  }
}

export default createFragmentContainer(
  Reactions,
  graphql`
      fragment Reactions_proposal on Proposal {
          reactions(first: 99999) @connection(key: "Reactions_reactions"){
              edges {
                  node {
                      ...Reaction_reaction
                      id
                  }
              }
          }
      }
  `
)
