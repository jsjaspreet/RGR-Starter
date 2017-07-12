import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId, fromGlobalId, offsetToCursor } from 'graphql-relay'
import { ReactionEdgeType } from '../types'
import pgdb from '../../database/pgdb'
import { csrfCheckFromContext, userFromContext } from '../../util'

const createReactionMutation = mutationWithClientMutationId({
  name: 'CreateReaction',
  inputFields: {
    approve: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    comment: {
      type: GraphQLString
    },
    userId: {
      type: GraphQLID
    },
    proposalId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    newReactionEdge: {
      type: ReactionEdgeType,
      resolve: ({ newReaction, user }) => {
        newReaction.author = user
        return {
          cursor: offsetToCursor(newReaction.id),
          node: newReaction
        }
      }
    }
  },
  mutateAndGetPayload: async ({ approve, comment, userId, proposalId }, context) => {
    csrfCheckFromContext(context)
    const { pgPool } = context
    let computedUserId = userId
    let user
    if (!userId) {
      user = await userFromContext(context)
      computedUserId = user.id
    } else {
      user = await pgdb(pgPool).getUserById({ id: computedUserId })
    }
    const { id: computedProposalId } = fromGlobalId(proposalId)
    const newReaction = await pgdb(pgPool)
      .addReaction({ approve, comment, userId: computedUserId, proposalId: computedProposalId })
    return { newReaction, user }
  }
})

export default createReactionMutation
