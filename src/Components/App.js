import React, { Component } from 'react'
import MapComponent from './Map'
import ImageInput from './ImageInput'
import backendService from '../backendService'
import logo from '../logo.svg'

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
      image1PreviewUrl: '',
      image2PreviewUrl: '',
      image3PreviewUrl: '',
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
    let imagePreview = null

    if (this.state.imagePreviewUrl) {
      imagePreview = (<img src={this.state.imagePreviewUrl} height={150} alt='' />)
    } else {
      imagePreview = (<div className='previewText'>Please select an Image for Preview</div>)
    }

    return (
      <div className='App' style={{textAlign: 'center'}}>
        <div className='AppHeader'>
          <img src={logo} className='AppLogo' alt='logo' height='100px' />
          <h2 className='caption' style={{color: 'grey', fontWeight: 'bold'}}>Welcome to Messe München.</h2>
        </div>
        {!this.state.displayMap &&
          <div className='inputSelect'>
            <p className='AppIntro'>
              To get started, scan the logo closest to your position.
            </p>
            <ImageInput
              returnFile={(file) => this.setState({ file1: file })}
              returnName={(name) => this.setState({ company1: name })}
              returnPreviewUrl={(url) => this.setState({ image1PreviewUrl: url })}
            />
            <ImageInput
              returnFile={(file) => this.setState({ file2: file })}
              returnName={(name) => this.setState({ company2: name })}
              returnPreviewUrl={(url) => this.setState({ image2PreviewUrl: url })}
            />
            <ImageInput
              returnFile={(file) => this.setState({ file3: file })}
              returnName={(name) => this.setState({ company3: name })}
              returnPreviewUrl={(url) => this.setState({ image3PreviewUrl: url })}
            />
            <div>{imagePreview}</div>
            <input
              type={'submit'}
              onClick={() => this.handleFileSubmit()}
              disabled={!this.state.company1 || !this.state.company2 || !this.state.company3}
            />
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
