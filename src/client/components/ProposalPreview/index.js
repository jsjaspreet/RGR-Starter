import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './styles'

class ProposalPreview extends Component {
  render() {
    const { proposal } = this.props
    return (
      <Card style={styles.proposalContainer}>
        <CardTitle title="Proposal"/>
        <CardText>
          {proposal.proposal}
        </CardText>
        <CardActions>
          <RaisedButton primary label="See Vote"/>
        </CardActions>
      </Card>
    )
  }
}

export default createFragmentContainer(
  ProposalPreview,
  graphql`
      fragment ProposalPreview_proposal on Proposal {
          proposal
          createdAt
      }
  `
)
