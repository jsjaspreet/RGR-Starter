import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import ProposalGrid from '../../components/ProposalGrid'
import CreateProposal from '../../components/CreateProposal'
import styles from './styles'

class Home extends Component {

  render() {
    const { root } = this.props
    const greeting = `Welcome ${root.viewer.username}!`
    return (
      <div>
        <div style={{ display: "flex" }}>
          <h1 style={styles.greetingStyle}>{greeting}</h1>
          <div style={{ marginTop: 20 }}>
            <CreateProposal/>
          </div>
        </div>
        <ProposalGrid root={root}/>
      </div>
    )
  }
}

export default createFragmentContainer(
  Home,
  graphql`
      fragment Home_root on ProjectAPI {
          ...ProposalGrid_root
          viewer {
              id
              username
          }
      }
  `
)
