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
    },
    addReaction({ approve, comment, userId, proposalId }) {
      return pgPool.query(`
        insert into reactions(approve, comment, user_id, proposal_id) 
        values($1, $2, $3, $4) 
        returning *
      `, [approve, comment, userId, proposalId]).then(res => {
        const entry = humps.camelizeKeys(res.rows[0])
        entry.id = entry.reactionId
        return entry
      })
    },
    addDecision({ userId, proposalId, decision, approve }) {
      return pgPool.query(`
        insert into decisions(user_id, proposal_id, decision, approve) 
        values($1, $2, $3, $4) 
        returning *
      `, [userId, proposalId, decision, approve]).then(res => {
        const entry = humps.camelizeKeys(res.rows[0])
        entry.id = entry.decisionId
        return entry
      })
    }
  }
}