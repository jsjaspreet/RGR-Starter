import humps from 'humps'

export default pgPool => {
  return {
    addProposal({ proposal, userId }) {
      return pgPool.query(`
        insert into proposals(proposal, user_id, active)
        values($1, $2, true)
        returning *
      `, [proposal, userId]).then(res => {
        const entry = humps.camelizeKeys(res.rows[0])
        entry.id = entry.proposalId
        return entry
      })
    }
  }
}