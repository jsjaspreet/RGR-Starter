import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { Reaction } from '../types'
import pgdb from '../../database/pgdb'

const ReactionInput = new GraphQLInputObjectType({
  name: 'ReactionInput',
  fields: {
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
  }
})

const ReactionMutation = {
  type: Reaction,
  args: {
    input: { type: new GraphQLNonNull(ReactionInput) }
  },
  resolve: (obj, { input }, { pgPool }) => {
    const { approve, comment, userId, proposalId } = input
    return pgdb(pgPool).addReaction({ approve, comment, userId, proposalId })
  }
}

export default ReactionMutation
