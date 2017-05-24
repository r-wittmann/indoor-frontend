import React, { Component } from 'react'
import backendService from '../backendService'
import logo from '../logo.svg'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'QCS,SkyCell,Sinalco',
      position: {
        x: 0,
        y: 0
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit (event) {
    backendService.getPositionByCompanies(this.state.value)
      .then((response) => {
        this.setState({
          position: response
        })
      })
    event.preventDefault()
  }
  render () {
    return (
      <div className='App' style={{textAlign: 'center'}}>
        <div className='AppHeader' style={{height: 300}}>
          <img src={logo} className='AppLogo' alt='logo' height='100px' />
          <h2 className='caption' style={{color: 'grey', fontWeight: 'bold'}}>Welcome to Messe München.</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Companies (comma seperated):
              <input type='text' value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type='submit' value='Submit' />
          </form>
          <div>
            x: {this.state.position.x}, y: {this.state.position.y}
          </div>
        </div>
        <p className='AppIntro'>
          To get started, scan the logo closest to your position.
        </p>
        <input type='file' accept='image/*' />
      </div>
    )
  }
}

export default App
