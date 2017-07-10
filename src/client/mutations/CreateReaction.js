import {
  commitMutation,
  graphql
} from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../util/relayEnvironment'

const mutation = graphql`
    mutation CreateReactionMutation($input: CreateReactionInput!) {
        AddReaction(input: $input) {
            newReactionEdge {
                cursor
                node {
                    id
                    approve
                    comment
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

export function createReaction({ comment, approve, proposalId }) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          approve,
          comment,
          proposalId
        }
      },
      updater: (store) => {
        const payload = store.getRootField('AddReaction')
        const newEdge = payload.getLinkedRecord('newReactionEdge')
        const proposal = store.get(proposalId)
        const conn = ConnectionHandler.getConnection(
          proposal,
          'Reactions_reactions'
        )
        ConnectionHandler.insertEdgeAfter(conn, newEdge)
      }

    }
  )
}


