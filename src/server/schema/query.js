import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql'
import { joinMonsterResolver } from './util'
import { User, Proposal }from './types'

const rootQuery = new GraphQLObjectType({
  name: 'ProjectAPI',
  fields: () => ({
    // this is a complete hack since root queries can't have list fields
    // for more info: https://github.com/facebook/relay/issues/112
    root: {
      type: new GraphQLNonNull(rootQuery),
      resolve: () => ({})
    },
    users: {
      type: new GraphQLList(User),
      resolve: joinMonsterResolver
    },
    proposals: {
      type: new GraphQLList(Proposal),
      resolve: joinMonsterResolver
    }
  })
})

export default rootQuery
