import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} from 'graphql'
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray
} from 'graphql-relay'
import { nodeInterface } from '../definitions'
import { globalIdField } from 'graphql-relay'
import ReactionType from './reaction'
import DecisionType from './decision'
import UserType from './user'

const { connectionType: ReactionConnectionType } = connectionDefinitions({ nodeType: ReactionType })

const ProposalType = new GraphQLObjectType({
  name: 'Proposal',
  sqlTable: 'proposals',
  uniqueKey: 'id',
  fields: () => ({
    id: {
      description: 'The global ID for the Relay spec',
      ...globalIdField(),
      sqlDeps: ['id']
    },
    proposalText: {
      type: new GraphQLNonNull(GraphQLString),
      sqlColumn: 'proposal_text'
    },
    proposalSlug: {
      type: new GraphQLNonNull(GraphQLString),
      sqlColumn: 'proposal_slug'
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
    author: {
      type: UserType,
      sqlJoin(proposalTable, userTable) {
        return `${proposalTable}.user_id = ${userTable}.id`
      }
    },
    decision: {
      type: DecisionType,
      sqlJoin(proposalTable, decisionTable) {
        return `${proposalTable}.id = ${decisionTable}.proposal_id`
      }
    },
    reactions: {
      type: ReactionConnectionType,
      args: connectionArgs,
      sqlJoin(proposalTable, reactionTable) {
        return `${proposalTable}.id = ${reactionTable}.proposal_id`
      },
      resolve: ({ reactions }, args) => {
        return connectionFromArray(reactions, args)
      }
    }
  }),
  interfaces: () => [nodeInterface]
})

const { edgeType: ProposalEdgeType, connectionType: ProposalConnectionType } = connectionDefinitions({ nodeType: ProposalType })

export { ProposalType, ProposalEdgeType, ProposalConnectionType }
