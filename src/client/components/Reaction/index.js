import React, { Component } from 'react'
import moment from 'moment'
import FontAwesome from 'react-fontawesome'
import { createFragmentContainer, graphql } from 'react-relay'
import styles from './styles'

class Reaction extends Component {
  render() {
    const { reaction } = this.props
    const { approve, comment, createdAt, author } = reaction
    const fontAwesomeIcon = approve ? 'thumbs-up' : 'thumbs-down'
    const { username } = author
    const momentCreated = moment(createdAt).format("MMM D YYYY")
    return (
      <div style={styles.container}>
        <div style={styles.topRow}>
          <div style={styles.thumbsIcon}>
            <FontAwesome
              name={fontAwesomeIcon}
              size='2x'
            />
          </div>
          <div style={styles.username}>
            {username}
          </div>
          <div style={styles.date}>
            {momentCreated}
          </div>
        </div>
        <div style={styles.comment}>
          { comment }
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(
  Reaction,
  graphql`
      fragment Reaction_reaction on Reaction {
          approve
          comment
          createdAt
          author {
              username
          }
      }
  `
)
