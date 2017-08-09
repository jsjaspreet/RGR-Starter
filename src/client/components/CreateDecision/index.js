import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { createFragmentContainer, graphql } from 'react-relay'
import RaisedButton from 'material-ui/RaisedButton'
import { createDecision } from '../../mutations/CreateDecision'
import styles from './styles'

const initialState = {
  approve: false,
  decision: ''
}

class CreateDecision extends Component {
  state = {
    approve: false,
    decision: ''
  }

  handleSubmit = () => {
    const { approve, decision } = this.state
    const { proposal } = this.props
    const { id: proposalId } = proposal
    createDecision({ approve, decision, proposalId })
    this.setState(initialState)
  }

  render() {
    return (
      <div style={styles.container}>
        <TextField
          floatingLabelText="Enter your decision"
          value={this.state.decision}
          style={styles.reactionInput}
          multiLine
          onChange={(event, decision) => this.setState({ decision })}
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
  CreateDecision,
  graphql`
      fragment CreateDecision_proposal on Proposal {
          id
      }
  `
)
