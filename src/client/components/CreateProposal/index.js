import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import environment from '../../util/relayEnvironment'
import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'

const mutation = graphql`
    mutation CreateProposalMutation($input: CreateProposalInput!) {
        AddProposal(input: $input) {
            newProposalEdge {
                cursor
                node {
                    id
                    proposalText
                    proposalSlug
                    createdAt
                    createdBy {
                        id
                        username
                    }
                }
            }
        }
    }
`

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
    const variables = {
      input: {
        proposal
      }
    }
    this.setState({ proposal: '' })
    commitMutation(
      environment,
      {
        mutation,
        variables,
        updater: (store) => {
          const payload = store.getRootField('AddProposal')
          const newEdge = payload.getLinkedRecord('newProposalEdge')
          const root = store.get(42)
          const conn = ConnectionHandler.getConnection(
            root,
            'ProposalGrid_proposals'
          )
          ConnectionHandler.insertEdgeAfter(conn, newEdge)
        }
      }
    )
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
