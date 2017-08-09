import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay'
import { DecisionType } from '../types'
import pgdb from '../../database/pgdb'
import { csrfCheckFromContext, userFromContext } from '../../util'

const createDecisionMutation = mutationWithClientMutationId({
  name: 'CreateDecision',
  inputFields: {
    approve: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    decision: {
      type: new GraphQLNonNull(GraphQLString)
    },
    userId: {
      type: GraphQLID
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
  mutateAndGetPayload: async ({ approve, decision, userId, proposalId }, context) => {
    csrfCheckFromContext(context)
    let id = userId
    if (!userId) {
      const user = await userFromContext(context)
      id = user.id
    }
    const { pgPool } = context
    const { id: computedProposalId } = fromGlobalId(proposalId)
    return { decision: pgdb(pgPool).addDecision({ approve, decision, userId: id, proposalId: computedProposalId }) }
  }
})

export default createDecisionMutation
