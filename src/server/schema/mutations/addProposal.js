import {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { ProposalType } from '../types'
import pgdb from '../../database/pgdb'
import { userFromContext } from '../../util/auth'

const createProposalMutation = mutationWithClientMutationId({
  name: 'CreateProposal',
  inputFields: {
    proposal: {
      type: new GraphQLNonNull(GraphQLString)
    },
    userId: {
      type: GraphQLID
    }
  },
  outputFields: {
    proposal: {
      type: ProposalType
    }
  },
  mutateAndGetPayload: async ({ proposal, userId }, ctx) => {
    const { pgPool } = ctx
    let id = userId
    if (!userId) {
      const user = await userFromContext(ctx)
      id = user.id
    }
    return { proposal: pgdb(pgPool).addProposal({ proposal, userId: id }) }
  }
})

export default createProposalMutation
