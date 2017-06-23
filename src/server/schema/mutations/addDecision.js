import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { DecisionType } from '../types'
import pgdb from '../../database/pgdb'

const createDecisionMutation = mutationWithClientMutationId({
  name: 'CreateDecision',
  inputFields: {
    approve: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    decision: {
      type: GraphQLString
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    proposalId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    decision: {
      type: DecisionType
    }
  },
  mutateAndGetPayload: ({ approve, decision, userId, proposalId }, { pgPool }) => {
    return { decision: pgdb(pgPool).addDecision({ approve, decision, userId, proposalId }) }
  }
})

export default createDecisionMutation
