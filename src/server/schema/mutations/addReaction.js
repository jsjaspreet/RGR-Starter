import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId, offsetToCursor } from 'graphql-relay'
import { ReactionEdgeType } from '../types'
import pgdb from '../../database/pgdb'
import { userFromContext } from '../../util/auth'

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
      type: new GraphQLNonNull(GraphQLID)
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
  mutateAndGetPayload: async ({ approve, comment, userId, proposalId }, ctx) => {
    const { pgPool } = ctx
    let id = userId
    let user
    if (!userId) {
      user = await userFromContext(ctx)
      id = user.id
    } else {
      user = await pgdb(pgPool).getUserById({ id })
    }
    const newReaction = await pgdb(pgPool).addReaction({ approve, comment, userId: id, proposalId })
    return { newReaction, user }
  }
})

export default createReactionMutation
