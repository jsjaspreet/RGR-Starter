import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import LightBulb from 'material-ui/svg-icons/action/lightbulb-outline'

class LogOut extends Component {
  render() {
    return (
      <FlatButton style={{ color: 'white', marginTop: 6 }} label="Logout"/>
    )
  }
}

class Chrome extends Component {
  render() {
    return (
      <AppBar
        title="Pulse"
        iconElementLeft={<IconButton><LightBulb /></IconButton>}
        iconElementRight={<LogOut />}
      />
    );
  }
}

export default Chrome