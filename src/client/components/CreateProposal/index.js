import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class CreateProposal extends Component {
  state = {
    open: false,
    proposalText: ''
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = () => {
    this.setState({ open: false });
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
      <div style={{ marginLeft: 100, marginBottom: 50 }}>
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
              value={this.state.proposalText}
              multiLine
              style={{width: "100%"}}
              onChange={(event, proposalText) => this.setState({ proposalText })}
            />
          </div>
        </Dialog>
      </div>
    )
  }
}

export default CreateProposal
