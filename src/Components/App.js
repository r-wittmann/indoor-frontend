import React, { Component } from 'react'
import logo from '../logo.svg'

var styles = {
  App: {
    textAlign: 'center'
  },
  AppLogo: {
    height: 80
  },
  AppHeader: {
    backgroundColor: '#222',
    height: 150,
    padding: 20,
    color: 'white'
  },
  AppIntro: {
    fontSize: 'large'
  }
}

class App extends Component {
  render () {
    return (
      <div style={styles.App}>
        <div style={styles.AppHeader}>
          <img src={logo} style={styles.AppLogo} alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p style={styles.AppIntro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
