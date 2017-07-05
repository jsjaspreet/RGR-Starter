import {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import slug from 'slug'
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
    const newProposal = await pgdb(pgPool).addProposal({ proposal, slug: slug(proposal), userId: id })
    return { proposal: newProposal }
  }
})

export default createProposalMutation
