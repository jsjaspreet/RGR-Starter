import {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { ProposalType } from '../types'
import pgdb from '../../database/pgdb'

const createProposalMutation = mutationWithClientMutationId({
  name: 'CreateProposal',
  inputFields: {
    proposal: {
      type: new GraphQLNonNull(GraphQLString)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    proposal: {
      type: ProposalType
    }
  },
  mutateAndGetPayload: ({ proposal, userId }, { pgPool }) => {
    return { proposal: pgdb(pgPool).addProposal({ proposal, userId }) }
  }
})

export default createProposalMutation
