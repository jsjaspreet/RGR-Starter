import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { ReactionType } from '../types'
import pgdb from '../../database/pgdb'

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
    reaction: {
      type: ReactionType
    }
  },
  mutateAndGetPayload: ({ approve, comment, userId, proposalId }, { pgPool }) => {
    return { reaction: pgdb(pgPool).addReaction({ approve, comment, userId, proposalId }) }
  }
})

export default createReactionMutation
