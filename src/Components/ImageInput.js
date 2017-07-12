import React, { Component } from 'react'
import backendService from '../backendService'
import logService from '../logService'

class ImageInput extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  handleImageChange (event) {
    event.preventDefault()

    let reader = new FileReader()
    let file = event.target.files[0]

    this.props.returnFile(file)

    logService.log('image selected or taken and sent to image recognition API:', file)

    backendService.getCompanyPrediction(file)
      .then((response) => {
        logService.log('image analyzed:', `{result: ${response.Predictions[0].Tag}, probability: ${response.Predictions[0].Probability}}`)
        this.props.returnName(response.Predictions[0].Tag)
      })

    reader.onloadend = () => this.setState({ imagePreviewURL: reader.result })

    reader.readAsDataURL(file)
  }

  render () {
    return (
      <div style={{ height: 100, textAlign: 'center', border: '2px solid #262826', borderRadius: 2 }}>
        <label htmlFor={this.props.id} style={{ height: '100%', width: '100%', display: 'flex' }}>
          {this.state.imagePreviewURL
            ? <div style={{ display: 'block', margin: 'auto' }}>
              <img src={this.state.imagePreviewURL} className='img-responsive center-block' style={{ maxHeight: '100%' }} alt='selectedPicture' />
            </div>
            : <span className='glyphicon glyphicon-camera' style={{display: 'block', margin: 'auto', color: '#262826', marginTop: 40}} />
          }
        </label>
        <input id={this.props.id} type='file' style={{display: 'none'}} accept='image/*' onChange={this.handleImageChange} />
      </div>
    )
  }
}

export default ImageInput
