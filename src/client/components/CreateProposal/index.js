import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { createProposal } from '../../mutations/CreateProposal'

class CreateProposal extends Component {
  state = {
    open: false,
    proposal: ''
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = () => {
    this.setState({ open: false });
    const { proposal } = this.state
    this.setState({ proposal: '' })
    createProposal({ proposal })
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.setState({ open: false })}
      />,
      <FlatButton
        label="Create"
        primary={true}
        onClick={this.handleSubmit}
      />,
    ];
    return (
      <div style={{ marginLeft: 100, marginBottom: 20 }}>
        <RaisedButton label="Create New Proposal" onClick={this.handleOpen}/>
        <Dialog
          title="Create New Proposal"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleSubmit}>
          <div>
            <TextField
              floatingLabelText="Proposal Text"
              value={this.state.proposal}
              multiLine
              style={{ width: "100%" }}
              onChange={(event, proposal) => this.setState({ proposal })}
            />
          </div>
        </Dialog>
      </div>
    )
  }
}

export default CreateProposal
