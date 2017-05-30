import humps from 'humps'

export default pgPool => {
  return {
    addProposal({ proposal, userId }) {
      return pgPool.query(`
        insert into proposals(proposal, user_id, active)
        values($1, $2, true)
        returning *
      `, [proposal, userId]).then(res => {
        return humps.camelizeKeys(res.rows[0])
      })
    },
    addReaction({ approve, comment, userId, proposalId }) {
      return pgPool.query(`
        insert into reactions(approve, comment, user_id, proposal_id) 
        values($1, $2, $3, $4) 
        returning *
      `, [approve, comment, userId, proposalId]).then(res => {
          return humps.camelizeKeys(res.rows[0])
        }
      )
    },
    addDecision({ userId, proposalId, decision, approve }) {
      return pgPool.query(`
        insert into decisions(user_id, proposal_id, decision, approve) 
        values($1, $2, $3, $4) 
        returning *
      `, [userId, proposalId, decision, approve]).then(res => {
        return humps.camelizeKeys(res.rows[0])
      })
    },
    addUser({ email, username, password }) {
      return pgPool.query(`
        insert into users(email, username, password)
        values($1, $2, $3)
        returning id, email, username 
      `, [email, username, password]).then(res => {
        return humps.camelizeKeys(res.rows[0])
      })
    },
    getUserByUsername({ username }) {
      return pgPool.query(`
        select * 
        from users 
        where username=$1
      `, [username]).then(res => {
        if (res.rows.length < 1) {
          return null
        }
        return humps.camelizeKeys(res.rows[0])
      })
    },
    getUserById({ id }) {
      return pgPool.query(`
        select id, email, username 
        from users 
        where id=$1
      `, [id]).then(res => {
        if (res.rows.length < 1) {
          return null
        }
        return humps.camelizeKeys(res.rows[0])
      })
    }
  }
}