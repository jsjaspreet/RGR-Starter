import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { createFragmentContainer, graphql } from 'react-relay'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './styles'

class ProposalPreview extends Component {
  render() {
    const { proposal } = this.props
    const { proposalText, proposalSlug, createdAt, author } = proposal
    const { username } = author
    const momentCreated = moment(createdAt).format("MMM D YYYY")
    return (
      <Card style={styles.proposalContainer}>
        <CardTitle title={proposalText} subtitle={`Created ${momentCreated} by ${username}`}
                   subtitleStyle={{ fontSize: 12 }}/>
        <CardActions>
          <Link to={`/proposal/${proposalSlug}`}>
            <RaisedButton primary label="Details"/>
            <RaisedButton secondary style={{ marginLeft: 12 }} label="Archive"/>
          </Link>
        </CardActions>
      </Card>
    )
  }
}

export default createFragmentContainer(
  ProposalPreview,
  graphql`
      fragment ProposalPreview_proposal on Proposal {
          proposalText
          proposalSlug
          createdAt
          author {
              username
          }
      }
  `
)
