import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookie from 'js-cookie'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import LightBulb from 'material-ui/svg-icons/action/lightbulb-outline'

class LogOut extends Component {
  logout() {
    if (Cookie.get('pulse-app')) {
      Cookie.remove('pulse-app')
    }
    window.location = '/'
    location.reload()
  }

  render() {
    return (
      <FlatButton onClick={this.logout}
                  style={{ color: 'white', marginTop: 6 }} label="Logout"/>
    )
  }
}

class Chrome extends Component {
  render() {
    return (
      <AppBar
        title="Pulse"
        iconElementLeft={<Link to="/"><IconButton><LightBulb color="white"/></IconButton></Link>}
        iconElementRight={<LogOut />}
      />
    );
  }
}

export default Chrome