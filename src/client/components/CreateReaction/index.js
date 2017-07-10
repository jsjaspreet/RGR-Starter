import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './styles'

const initialState = {
  approve: false,
  reactionText: ''
}

class CreateReaction extends Component {
  state = {
    approve: false,
    reactionText: ''
  }

  handleSubmit = () => {
    const { approve, reactionText } = this.state
    console.log({ approve, reactionText })
    this.setState(initialState)
  }

  render() {
    return (
      <div style={styles.container}>
        <TextField
          floatingLabelText="Enter your reaction"
          value={this.state.reactionText}
          style={styles.reactionInput}
          multiLine
          onChange={(event, reactionText) => this.setState({ reactionText })}
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

export default CreateReaction
