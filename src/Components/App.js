import React, { Component } from 'react'
import AppHeader from './AppHeader'
import MapComponent from './Map'
import ImageInput from './ImageInput'
import backendService from '../backendService'
import 'bootstrap/dist/css/bootstrap.css'
import logo from '../logo.svg'
import {Grid, Col, Row, h1} from 'react-bootstrap'






class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      company1: '',
      company2: '',
      company3: '',
      file1: '',
      file2: '',
      file3: '',
      highlight: [],
      position: {},
      booths: [],
      displayMap: false
    }

    this.handleFileSubmit = this.handleFileSubmit.bind(this)
  }

  componentDidMount () {
    backendService.getBooths()
      .then((response) => this.setState({ booths: response }))
  }

  handleFileSubmit () {
    backendService.getPositionByCompanies(`${this.state.company1},${this.state.company2},${this.state.company3}`)
      .then((response) => {
        this.setState({
          position: response,
          highlight: [this.state.company1, this.state.company2, this.state.company3],
          displayMap: true
        })
      })
  }

  render () {
    return (
      <div className='container-fluid'>



        <AppHeader />
        {!this.state.displayMap &&
          <div className='inputSelect'>






      
      <div className='row' style={{height:100, marginTop: 20}}>

       <div className='col-xs-4 col-md-4' style={{backgroundColor:'#264082', transform:'matrix(1,-0.3,0,1,0,+20)'}}>

        <ImageInput
              returnFile={(file) => this.setState({ file1: file })}
              returnName={(name) => this.setState({ company1: name })}
        />
        </div>


      
      <div className='col-xs-4 col-md-4' style={{backgroundColor:'#264082'}}>
        <ImageInput
              returnFile={(file) => this.setState({ file2: file })}
              returnName={(name) => this.setState({ company2: name })}
        />
      </div>
      


      
      <div className='col-xs-4 col-md-4' style={{backgroundColor:'#264082', transform:'matrix(1,0.3,0,1,0,20)'}}>
        <ImageInput
              returnFile={(file) => this.setState({ file3: file })}
              returnName={(name) => this.setState({ company3: name })}
        />
      </div>
     </div>


      

      <div className='row'>
      <div className='col-xs-4 col-md-4'>
      </div>
       <div className='col-xs-4 col-md-4'>

        <button
        className='btn btn-primary'
          type={'submit'}
          style={{backgroundColor:'#264082', fontColor:'white'}}
          onClick={() => this.handleFileSubmit()}
          disabled={!this.state.company1 || !this.state.company2 || !this.state.company3}>
          Submit
        </button>
      </div>
      <div className='col-xs-4 col-md-4'>
      </div>
      </div>



    
  </div>


          
        }
        {this.state.displayMap &&
          <MapComponent
            position={this.state.position}
            booths={this.state.booths}
          />
        }
      </div>
    )
  }
}

export default App
