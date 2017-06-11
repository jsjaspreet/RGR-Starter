import { GraphQLObjectType } from 'graphql'
import {
  AddProposalMutation,
  AddDecisionMutation,
  AddUserMutation,
  AddReactionMutation,
  LoginMutation
} from './mutations'

const RootMutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    AddProposal: AddProposalMutation,
    AddReaction: AddReactionMutation,
    AddDecision: AddDecisionMutation,
    Login: LoginMutation,
    AddUser: AddUserMutation
  })
})

export default RootMutation
