import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} from 'graphql'

const Reaction = new GraphQLObjectType({
  name: 'Reaction',
  sqlTable: 'reactions',
  uniqueKey: 'id',
  fields: () => ({
    id: {
      type: GraphQLID
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
  })

})

export default Reaction