import React, { Component } from 'react'
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

  componentDidMount () {
    this.backendURL = process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/api/'
      : 'https://indoornav.cfapps.io/api/'
  }

  handleChange (event) {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit (event) {
    fetch(this.backendURL + 'get-position?companies=' + this.state.value)
      .then((response) => {
        response.json()
        .then((json) => {
          this.setState({
            position: json
          })
        })
      })
    event.preventDefault()
  }
  render () {
    return (
      <div className='App' style={{textAlign: 'center'}}>
        <div className='AppHeader' style={{height: 300}}>
          <img src={logo} className='AppLogo' alt='logo' height='100px' />
          <h2 className='caption' style={{color: 'grey', fontWeight: 'bold'}}> Welcome to Messe München. </h2>
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
