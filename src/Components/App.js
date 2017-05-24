import React, { Component } from 'react'
import logo from '../logo.svg'
import Test from './Test'


var styles = {
  App: {
    textAlign: 'center'
  },
  AppLogo: {
    height: 80
  },
  AppIntro: {
    fontSize: 'small'
  }
}


class App extends Component {
    constructor(props) {
    super(props);
    this.state = {value: '', position: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

    handleSubmit(event) {
    fetch('http://localhost:8080/api/get-position?companies='+this.state.value)
    .then((response)=>console.log(response))
    event.preventDefault();
  }
  render () {

    return (
    
      <div className="App" style={{textAlign: 'center'}}>
        <div className="AppHeader" style={{height: 300}}>
      <img src={logo} className="AppLogo" alt="logo" height="100px" />
      <h2 className="caption" style={{color: 'grey', fontWeight: 'bold'}}> Welcome to Messe München. </h2> 
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
      {this.state.position}
      </div>
      </div>
      <p className="AppIntro">
      To get started, scan the logo closest to your position. 
      </p>
 <input type="file" accept="image/*"></input>
      </div>
    )
  }
}

export default App
