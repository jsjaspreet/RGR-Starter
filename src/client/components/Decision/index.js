import React, { PureComponent } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import styles from './styles'

class Decision extends PureComponent {
  render() {
    const { decision } = this.props
    if (!decision) {
      return null
    }
    const { decision: decisionText, approve } = decision
    return (
      <h1 style={styles({ approve })}>{decisionText}</h1>
    )
  }
}

export default createFragmentContainer(
  Decision,
  graphql`
      fragment Decision_decision on Decision {
          decision
          approve
      }
  `,
)
