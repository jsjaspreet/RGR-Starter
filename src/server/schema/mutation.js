import { GraphQLObjectType } from 'graphql'
import {
  AddProposalMutation,
  AddDecisionMutation,
  AddReactionMutation
} from './mutations'

const RootMutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    AddProposal: AddProposalMutation,
    AddReaction: AddReactionMutation,
    AddDecision: AddDecisionMutation
  })
})

export default RootMutation
