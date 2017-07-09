import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} from 'graphql'
import {
  connectionDefinitions,
} from 'graphql-relay'
import { nodeInterface } from '../definitions'
import { globalIdField } from 'graphql-relay'
import UserType from './user'

const ReactionType = new GraphQLObjectType({
  name: 'Reaction',
  sqlTable: 'reactions',
  uniqueKey: 'id',
  fields: () => ({
    id: {
      description: 'The global ID for the Relay spec',
      ...globalIdField(),
      sqlDeps: ['id']
    },
    approve: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    comment: {
      type: GraphQLString
    },
    userId: {
      type: GraphQLID,
      sqlColumn: 'user_id'
    },
    author: {
      type: UserType,
      sqlJoin(proposalTable, userTable) {
        return `${proposalTable}.user_id = ${userTable}.id`
      }
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      sqlColumn: 'created_at'
    },
    proposalId: {
      type: GraphQLID,
      sqlColumn: 'proposal_id'
    }
  }),
  interfaces: () => [nodeInterface]
})

const { edgeType: ReactionEdgeType, connectionType: ReactionConnectionType } = connectionDefinitions({ nodeType: ReactionType })

export { ReactionType, ReactionConnectionType, ReactionEdgeType }