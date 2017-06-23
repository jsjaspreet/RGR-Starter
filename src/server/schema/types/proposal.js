import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} from 'graphql'
import { nodeInterface } from '../definitions'
import { globalIdField } from 'graphql-relay'
import Reaction from './reaction'
import Decision from './decision'

const Proposal = new GraphQLObjectType({
  name: 'Proposal',
  sqlTable: 'proposals',
  uniqueKey: 'id',
  fields: () => ({
    id: {
      description: 'The global ID for the Relay spec',
      ...globalIdField(),
      sqlDeps: ['id']
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
        return `${proposalTable}.id = ${decisionTable}.proposal_id`
      }
    },
    reactions: {
      type: new GraphQLList(Reaction),
      sqlJoin(proposalTable, reactionTable) {
        return `${proposalTable}.id = ${reactionTable}.proposal_id`
      }
    }
  }),
  interfaces: () => [nodeInterface]
})

export default Proposal
