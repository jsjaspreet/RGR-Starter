import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql'
import joinMonster from 'join-monster'
import { Proposal }from './types'

const rootQuery = new GraphQLObjectType({
  name: 'ProjectAPI',
  fields: () => ({
    proposals: {
      type: new GraphQLList(Proposal),
      resolve: (obj, args, { pgPool }, resolveInfo) => {
        return joinMonster(resolveInfo, {}, sql => {
          return pgPool.query(sql)
        })
      }
    }
  })
})

export default rootQuery
