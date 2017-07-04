import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createFragmentContainer, graphql } from 'react-relay'
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './styles'

class ProposalPreview extends Component {
  render() {
    const { proposal } = this.props
    const { proposalText, proposalSlug } = proposal
    return (
      <Card style={styles.proposalContainer}>
        <CardTitle title="Proposal"/>
        <CardText>
          {proposalText}
        </CardText>
        <CardActions>
          <Link to={`/proposal/${proposalSlug}`}>
            <RaisedButton primary label="See Vote"/>
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
      }
  `
)
