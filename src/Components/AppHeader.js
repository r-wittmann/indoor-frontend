import React, { Component } from 'react'
import logo from '../logo.png'

class AppHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <div className='header-blue'>
          <nav className='navbar navbar-default navigation-clean-search' style={{ marginBottom: 0 }}>
            <div className='container'>
              <div className='navbar-header'><a className='navbar-brand navbar-link' href='#'>Messe München</a>
                <img src={logo} className='img-responsive' alt='logo' style={{ maxHeight: 50, float: 'right', marginRight: 10 }} />
              </div>
            </div>
          </nav>
          {this.props.showHint &&
            <div className='container hero'>
              <div className='row'>
                <div className='col-lg-5 col-lg-offset-1 col-md-6 col-md-offset-0'>
                  <h1>FIND ME!</h1>
                  <p>To find your current location, take a picture of the logo on your left, right and in front of you. </p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

    )
  }
}

export default AppHeader
