import { GraphQLObjectType } from 'graphql'
import {
  AddProposalMutation,
  AddDecisionMutation,
  AddUserMutation,
  AddReactionMutation
} from './mutations'

const RootMutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    AddProposal: AddProposalMutation,
    AddReaction: AddReactionMutation,
    AddDecision: AddDecisionMutation,
    AddUser: AddUserMutation
  })
})

export default RootMutation
