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
  render () {
    return (
      <div className="App" style={{textAlign: 'center'}}>
        <div className="AppHeader" style={{height: 300}}>
      <img src={logo} className="AppLogo" alt="logo" height="100px" />
      <h2 className="caption" style={{color: 'grey', fontWeight: 'bold'}}> Welcome to Messe München. </h2> 
      <Test text={'Test1'} accept={true}/>     
      <Test text={'Test2'}/>     
     
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
