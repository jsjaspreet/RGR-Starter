import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql'
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray
} from 'graphql-relay'
import escape from 'pg-escape'
import { joinMonsterResolver } from './util'
import { UserType, ProposalType, ProposalConnectionType } from './types'
import { nodeField } from './definitions'
import { userFromContext } from '../util/auth'

const { connectionType: UserConnectionType } = connectionDefinitions({ nodeType: UserType })

const viewerField = {
  type: UserType,
  resolve: async (root, args, ctx) => {
    return await userFromContext(ctx)
  }
}

const rootQuery = new GraphQLObjectType({
  name: 'ProjectAPI',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: () => 42
    },
    // this is a complete hack since root queries can't have list fields
    // for more info: https://github.com/facebook/relay/issues/112
    root: {
      type: new GraphQLNonNull(rootQuery),
      resolve: () => ({})
    },
    viewer: viewerField,
    node: nodeField,
    users: {
      type: UserConnectionType,
      args: connectionArgs,
      resolve: async (obj, args, ctx, resolveInfo) => {
        const userList = await joinMonsterResolver(obj, args, ctx, resolveInfo)
        return connectionFromArray(userList, args)
      }
    },
    proposal: {
      type: ProposalType,
      args: {
        slug: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (obj, args, ctx, resolveInfo) => {
        return await joinMonsterResolver(obj, args, ctx, resolveInfo)
      },
      where: (proposalTable, { slug }) => {
        return escape(`${proposalTable}.proposal_slug=%L`, slug)
      }
    },
    proposals: {
      type: ProposalConnectionType,
      args: connectionArgs,
      resolve: async (obj, args, ctx, resolveInfo) => {
        const proposalList = await joinMonsterResolver(obj, args, ctx, resolveInfo)
        return connectionFromArray(proposalList, args)
      }
    }
  })
})

export default rootQuery
