import {
  commitMutation,
  graphql
} from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../util/relayEnvironment'

const mutation = graphql`
    mutation CreateDecisionMutation($input: CreateDecisionInput!) {
        AddDecision(input: $input) {
            decision {
                id
                decision
                approve
            }
        }
    }
`

export function createDecision({ decision, approve, proposalId }) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          approve,
          decision,
          proposalId
        }
      },
      updater: (store) => {
        const payload = store.getRootField('AddDecision')
        const decision = payload.getLinkedRecord('decision')
        const proposal = store.get(proposalId)
        proposal.setLinkedRecord(decision, "decision")
      }
    }
  )
}


