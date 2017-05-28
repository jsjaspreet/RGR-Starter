import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql'
import { joinMonsterResolver } from './util'
import { User, Proposal }from './types'

const rootQuery = new GraphQLObjectType({
  name: 'ProjectAPI',
  fields: () => ({
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
