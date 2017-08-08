import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { createRefetchContainer, graphql } from 'react-relay'
import Reactions from '../../components/Reactions'
import CreateReaction from '../../components/CreateReaction'
import ProposalOwner from '../../components/ProposalOwner'
import styles from './styles'

class ProposalDetails extends Component {
  componentDidMount() {
    this.props.relay.refetch({ slug: this.props.proposalSlug }, null)
  }

  render() {
    const { proposal, viewer } = this.props.root
    if (!proposal) {
      return <CircularProgress/>
    }
    const { proposalText } = proposal
    return (
      <div>
        <div style={styles.proposalContainer}>
          <h1 style={styles.proposalText}>{proposalText}</h1>
        </div>
        <div style={styles.createReaction}>
          <CreateReaction proposal={proposal}/>
        </div>
        <div style={styles.sectionContainer}>
          <Reactions proposal={proposal}/>
        </div>
        <ProposalOwner proposal={proposal} viewer={viewer}>
          <div style={styles.sectionContainer}>
            you own this proposal!
          </div>
        </ProposalOwner>
      </div>
    )
  }
}

export default createRefetchContainer(
  ProposalDetails,
  {
    root: graphql.experimental`
        fragment ProposalDetails_root on ProjectAPI
        @argumentDefinitions(
            slug: {type: "String!", defaultValue: ""}
        ) {
            proposal(slug: $slug) {
                id
                proposalText
                ...Reactions_proposal
                ...CreateReaction_proposal
                ...ProposalOwner_proposal
            }
            viewer {
                ...ProposalOwner_viewer
            }
        }
    `,
  },
  graphql.experimental`
      query ProposalDetailsRefetchQuery($slug: String!) {
          root {
              ...ProposalDetails_root @arguments(slug: $slug)
          }
      }
  `
)
