import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { Decision } from '../types'
import pgdb from '../../database/pgdb'

const DecisionInput = new GraphQLInputObjectType({
  name: 'DecisionInput',
  fields: {
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
  }
})

const DecisionMutation = {
  type: Decision,
  args: {
    input: { type: new GraphQLNonNull(DecisionInput) }
  },
  resolve: (obj, { input }, { pgPool }) => {
    const { approve, decision, userId, proposalId } = input
    return pgdb(pgPool).addDecision({ approve, decision, userId, proposalId })
  }
}

export default DecisionMutation
