import { GraphQLObjectType } from 'graphql'
import {
  AddProposalMutation
} from './mutations'

const RootMutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    AddProposal: AddProposalMutation
  })
})

export default RootMutation
