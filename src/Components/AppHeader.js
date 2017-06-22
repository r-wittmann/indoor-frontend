import React, { Component } from 'react'
import logo from '../logo.svg'

class AppHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div style={{ height: 64, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <img src={logo} className='AppLogo' alt='logo' style={{ height: 52 }} />
        <div className='caption' style={{ color: 'grey', fontSize: 'larg', fontWeight: 'bold' }}>Welcome to Messe München.</div>
      </div>
    )
  }
}

export default AppHeader
