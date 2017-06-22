import React, { Component } from 'react'
import backendService from '../backendService'

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

    backendService.getCompanyPrediction(file)
      .then((response) => this.props.returnName(response.Predictions[0].Tag))

    reader.onloadend = () => this.props.returnPreviewUrl(reader.result)

    reader.readAsDataURL(file)
  }

  render () {
    return (
      <input type='file' accept='image/*' onChange={this.handleImageChange} />
    )
  }
}

export default ImageInput
