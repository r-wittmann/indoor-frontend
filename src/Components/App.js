import React, { Component } from 'react'
import AppHeader from './AppHeader'
import MapComponent from './Map'
import ImageInput from './ImageInput'
import backendService from '../backendService'
import PopUpModal from './PopUpModal'

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
      displayMap: false,
      modalIsOpen: false
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
      <div className='container-fluid' style={{ paddingRight: 0, paddingLeft: 0 }}>
        <AppHeader showHint={!this.state.displayMap} />
        {!this.state.displayMap &&
          <div className='inputSelect'>
            <div className='row' style={{height: 150, margin: 10}}>
              <div className='col-xs-4' style={{ padding: 0, paddingRight: 5, transform: 'skewY(-16deg)', transformOrigin: '100% 50%' }}>
                <ImageInput
                  id='imageInput1'
                  returnFile={(file) => this.setState({ file1: file })}
                  returnName={(name) => this.setState({ company1: name })}
                />
                <p className='text-center'>{this.state.company1}</p>
              </div>
              <div className='col-xs-4' style={{ padding: 0 }}>
                <ImageInput
                  id='imageInput2'
                  returnFile={(file) => this.setState({ file2: file })}
                  returnName={(name) => this.setState({ company2: name })}
                />
                <p className='text-center'>{this.state.company2}</p>
              </div>
              <div className='col-xs-4' style={{ padding: 0, paddingLeft: 5, transform: 'skewY(16deg)', transformOrigin: '0% 50%' }}>
                <ImageInput
                  id='imageInput3'
                  returnFile={(file) => this.setState({ file3: file })}
                  returnName={(name) => this.setState({ company3: name })}
                />
                <p className='text-center'>{this.state.company3}</p>
              </div>
            </div>
            <button
              className='btn btn-primary center-block'
              type={'submit'}
              style={{ backgroundColor: '#264082', fontColor: 'white' }}
              onClick={() => this.handleFileSubmit()}
              disabled={!this.state.company1 || !this.state.company2 || !this.state.company3}
            >
              Submit
            </button>
          </div>
        }
        {this.state.displayMap &&
          <div style={{ height: 'calc(100vh - 70px) ' }}>
            <MapComponent
              position={this.state.position}
              booths={this.state.booths}
            />
          </div>
        }

        <div
          className='footer'
          style={{height: 60, width: '100%', position: 'absolute', backgroundColor: '#6487CD', bottom: 0, textAlign: 'center'}}>
          <div>
            <button
              className='btn btn-primary center-block'
              style={{ marginTop: 15 }}
              onClick={() => this.setState({ modalIsOpen: true })}
            >
              Help
            </button>
            <PopUpModal
              isOpen={this.state.modalIsOpen}
              closeModal={() => this.setState({ modalIsOpen: false })}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
