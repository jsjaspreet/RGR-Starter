import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { createRefetchContainer, graphql } from 'react-relay'

class ProposalDetails extends Component {
  componentDidMount() {
    this.props.relay.refetch({ slug: this.props.proposalSlug }, null)
  }

  render() {
    const { proposal } = this.props.root
    console.log(proposal)
    if (!proposal) {
      return <CircularProgress/>
    }
    const { proposalText } = proposal
    return (
      <div>
        <h1>{proposalText}</h1>
      </div>
    )
  }
}

export default createRefetchContainer(
  ProposalDetails,
  {
    root:  graphql.experimental`
        fragment ProposalDetails_root on ProjectAPI
        @argumentDefinitions(
            slug: {type: "String!", defaultValue: ""}
        ) {
            proposal(slug: $slug) {
                id
                proposalText
                reactions(first: 999) {
                    edges {
                        node {
                            id
                            approve
                            comment
                            author {
                                id
                                username
                            }
                        }
                    }
                }
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
