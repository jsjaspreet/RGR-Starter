import { commitMutation, graphql } from 'react-relay'
import environment from '../util/relayEnvironment'
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
                    author {
                        id
                        username
                    }
                }
            }
        }
    }
`

export function createProposal({ proposal }) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          proposal
        }
      },
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
}
