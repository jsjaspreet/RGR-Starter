import React, { Component } from 'react'
import moment from 'moment'
import { createFragmentContainer, graphql } from 'react-relay'
import styles from './styles'

class Reaction extends Component {
  render() {
    const { reaction } = this.props
    const { approve, comment, createdAt, author } = reaction
    const { username } = author
    const momentCreated = moment(createdAt).format("MMM D YYYY")
    return (
      <div>
        <div>
          Approve: {approve ? "Yes" : "No"} | {username} | {momentCreated}
        </div>
        <div>
          { comment }
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(
  Reaction,
  graphql`
      fragment Reaction_reaction on Proposal {
          proposalText
          proposalSlug
          createdAt
          author {
              username
          }
      }
  `
)
