import React, { Component } from 'react'
import logo from '../logo.svg'



class AppHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }


  render () {
    return (
  <div>    
  <img src={logo} className='img-responsive' alt='logo' style={{maxHeight: 50}} /> 
  <h1> Welcome to Messe München.</h1>
  <small>Indoor Navigation</small>
  </div>


    )
  }
}


 






export default AppHeader
