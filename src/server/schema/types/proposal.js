import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} from 'graphql'
import Reaction from './reaction'
import Decision from './decision'

const Proposal = new GraphQLObjectType({
  name: 'Proposal',
  sqlTable: 'proposals',
  uniqueKey: 'proposal_id',
  fields: () => ({
    id: {
      type: GraphQLID,
      sqlColumn: 'proposal_id'
    },
    proposal: {
      type: new GraphQLNonNull(GraphQLString)
    },
    userId: {
      type: GraphQLID,
      sqlColumn: 'user_id'
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      sqlColumn: 'created_at'
    },
    active: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    decision: {
      type: Decision,
      sqlJoin(proposalTable, decisionTable) {
        return `${proposalTable}.proposal_id = ${decisionTable}.proposal_id`
      }
    },
    reactions: {
      type: new GraphQLList(Reaction),
      sqlJoin(proposalTable, reactionTable) {
        return `${proposalTable}.proposal_id = ${reactionTable}.proposal_id`
      }
    }
  })
})

export default Proposal
