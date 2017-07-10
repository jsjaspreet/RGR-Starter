import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { createFragmentContainer, graphql } from 'react-relay'
import RaisedButton from 'material-ui/RaisedButton'
import { createReaction } from '../../mutations/CreateReaction'
import styles from './styles'

const initialState = {
  approve: false,
  comment: ''
}

class CreateReaction extends Component {
  state = {
    approve: false,
    comment: ''
  }

  handleSubmit = () => {
    const { approve, comment } = this.state
    const { proposal } = this.props
    const { id: proposalId } = proposal
    createReaction({ approve, comment, proposalId })
    this.setState(initialState)
  }

  render() {
    return (
      <div style={styles.container}>
        <TextField
          floatingLabelText="Enter your reaction"
          value={this.state.comment}
          style={styles.reactionInput}
          multiLine
          onChange={(event, comment) => this.setState({ comment })}
        />
        <div style={styles.approve}>
          <Checkbox
            label="Approve?"
            labelPosition="left"
            checked={this.state.approve}
            onCheck={(event, approve) => this.setState({ approve })}
            style={{ width: 112 }}
          />
        </div>
        <div style={styles.submit}>
          <RaisedButton primary
                        onClick={this.handleSubmit}
                        label="Submit"/>
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(
  CreateReaction,
  graphql`
      fragment CreateReaction_proposal on Proposal {
          id
      }
  `
)
