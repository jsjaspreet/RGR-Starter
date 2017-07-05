import {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId, offsetToCursor } from 'graphql-relay'
import slug from 'slug'
import { ProposalEdgeType } from '../types'
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
    newProposalEdge: {
      type: ProposalEdgeType,
      resolve: ({ newProposal }) => ({
        cursor: offsetToCursor(newProposal.id),
        node: newProposal
      })
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
    return { newProposal }
  }
})

export default createProposalMutation
