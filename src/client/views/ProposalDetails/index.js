import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { createRefetchContainer, graphql } from 'react-relay'
import Reactions from '../../components/Reactions'

class ProposalDetails extends Component {
  componentDidMount() {
    this.props.relay.refetch({ slug: this.props.proposalSlug }, null)
  }

  render() {
    const { proposal } = this.props.root
    if (!proposal) {
      return <CircularProgress/>
    }
    const { proposalText } = proposal
    return (
      <div>
        <h1>{proposalText}</h1>
        <div>
          <Reactions proposal={proposal}/>
        </div>
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
            }
        }
    `
  },
  graphql.experimental`
      query ProposalDetailsRefetchQuery($slug: String!) {
          root {
              ...ProposalDetails_root @arguments(slug: $slug)
          }
      }
  `
)
