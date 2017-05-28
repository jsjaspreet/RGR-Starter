import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { Proposal } from '../types'
import pgdb from '../../database/pgdb'

const ProposalInput = new GraphQLInputObjectType({
  name: 'ProposalInput',
  fields: {
    proposal: {
      type: new GraphQLNonNull(GraphQLString)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  }
})

const ProposalMutation = {
  type: Proposal,
  args: {
    input: { type: new GraphQLNonNull(ProposalInput) }
  },
  resolve: (obj, { input }, { pgPool }) => {
    const { proposal, userId } = input
    return pgdb(pgPool).addProposal({ proposal, userId })
  }
}

export default ProposalMutation
