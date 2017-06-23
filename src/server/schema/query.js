import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql'
import { joinMonsterResolver } from './util'
import { UserType, ProposalType }from './types'
import { nodeField } from './definitions'

const rootQuery = new GraphQLObjectType({
  name: 'ProjectAPI',
  fields: () => ({
    // this is a complete hack since root queries can't have list fields
    // for more info: https://github.com/facebook/relay/issues/112
    root: {
      type: new GraphQLNonNull(rootQuery),
      resolve: () => ({})
    },
    node: nodeField,
    users: {
      type: new GraphQLList(UserType),
      resolve: joinMonsterResolver
    },
    proposals: {
      type: new GraphQLList(ProposalType),
      resolve: joinMonsterResolver
    }
  })
})

export default rootQuery
