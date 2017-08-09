import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} from 'graphql'
import { nodeInterface } from '../definitions'
import { globalIdField } from 'graphql-relay'

const Decision = new GraphQLObjectType({
  name: 'Decision',
  sqlTable: 'decisions',
  uniqueKey: 'id',
  fields: () => ({
    id: {
      description: 'The global ID for the Relay spec',
      ...globalIdField(),
      sqlDeps: ['id']
    },
    userId: {
      type: GraphQLID,
      sqlColumn: 'user_id'
    },
    proposalId: {
      type: GraphQLID,
      sqlColumn: 'proposal_id'
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      sqlColumn: 'created_at'
    },
    decision: {
      type: GraphQLString,
    },
    approve: {
      type: new GraphQLNonNull(GraphQLBoolean),
    }
  }),
  interfaces: () => [nodeInterface]
})

export default Decision
