import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} from 'graphql'
import { nodeInterface } from '../definitions'
import { globalIdField } from 'graphql-relay'

const Reaction = new GraphQLObjectType({
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

export default Reaction