import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql'
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray
} from 'graphql-relay'
import { joinMonsterResolver } from './util'
import { UserType, ProposalType }from './types'
import { nodeField } from './definitions'

const { connectionType: UserConnectionType } = connectionDefinitions({ nodeType: UserType })
const { connectionType: ProposalConnectionType } = connectionDefinitions({ nodeType: ProposalType })

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
      type: UserConnectionType,
      args: connectionArgs,
      resolve: async (obj, args, ctx, resolveInfo) => {
        const userList = await joinMonsterResolver(obj, args, ctx, resolveInfo)
        return connectionFromArray(userList, args)
      }
    },
    proposals: {
      type: ProposalConnectionType,
      resolve: async (obj, args, ctx, resolveInfo) => {
        const proposalList = await joinMonsterResolver(obj, args, ctx, resolveInfo)
        return connectionFromArray(proposalList, args)
      }
    }
  })
})

export default rootQuery
