import joinMonster from 'join-monster'

export const joinMonsterResolver = (obj, args, { pgPool }, resolveInfo) => {
  return joinMonster(resolveInfo, {}, sql => {
    return pgPool.query(sql)
  }, { dialect: 'pg' })
}