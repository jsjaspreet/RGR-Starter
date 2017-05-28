import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql'

const Decision = new GraphQLObjectType({
  name: 'Decision',
  sqlTable: 'decisions',
  uniqueKey: 'decision_id',
  fields: () => ({
    id: {
      type: GraphQLID,
      sqlColumn: 'decision_id'
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
      type: new GraphQLNonNull(GraphQLString),
    }
  })
})

export default Decision
