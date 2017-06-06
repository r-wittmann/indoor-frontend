import React, { Component } from 'react'
// import FloorPlan from './FloorPlan'
import MapComponent from './Map'
import backendService from '../backendService'
import logo from '../logo.svg'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      company1: 'Qatar-Airways-Cargo',
      company2: 'Wallenborn',
      company3: 'Latem-Airlines-Group',
      highlight: [],
      position: {
        x: 0,
        y: 0
      },
      file: '',
      imagePreviewUrl: '',
      booths: []
    }

    this.handleSubmit = this.handleInputSubmit.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  componentDidMount () {
    backendService.getBooths()
      .then((response) => this.setState({ booths: response }))
  }

  handleInputSubmit (event) {
    backendService.getPositionByCompanies(`${this.state.company1},${this.state.company2},${this.state.company3}`)
      .then((response) => {
        this.setState({
          position: response,
          highlight: [this.state.company1, this.state.company2, this.state.company3]
        })
      })
    event.preventDefault()
  }

  handleImageChange (event) {
    event.preventDefault()

    let reader = new FileReader()
    let file = event.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
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
        <div className='AppHeader' style={{height: 300}}>
          <img src={logo} className='AppLogo' alt='logo' height='100px' />
          <h2 className='caption' style={{color: 'grey', fontWeight: 'bold'}}>Welcome to Messe München.</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Companies:
              <select value={this.state.company1} onChange={(value) => this.setState({company1: value.target.value})}>
                {this.state.booths.map((booth) =>
                  <option key={Math.random()} value={booth.name}>{booth.name}</option>
                )}
              </select>
              <select value={this.state.company2} onChange={(value) => this.setState({company2: value.target.value})}>
                {this.state.booths.map((booth) =>
                  <option key={Math.random()} value={booth.name}>{booth.name}</option>
                )}
              </select>
              <select value={this.state.company3} onChange={(value) => this.setState({company3: value.target.value})}>
                {this.state.booths.map((booth) =>
                  <option key={Math.random()} value={booth.name}>{booth.name}</option>
                )}
              </select>
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
        <input type='file' accept='image/*' onChange={this.handleImageChange} />
        <div>{imagePreview}</div>
        {
        /* <FloorPlan
          booths={this.state.booths}
          highlight={this.state.highlight}
          visitorPosition={this.state.position}
        /> */
        }
        <MapComponent />
      </div>
    )
  }
}

export default App
