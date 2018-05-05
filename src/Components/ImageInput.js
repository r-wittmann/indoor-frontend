import React, { Component } from 'react'
import backendService from '../backendService'
import logService from '../logService'

class ImageInput extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  urltoFile (url, filename, mimeType) {
    return (fetch(url)
        .then((res) => res.arrayBuffer())
        .then((buf) => new File([buf], filename, {type: mimeType}))
    )
  }

  handleImageChange (event) {
    let self = this
    event.preventDefault()

    let reader = new FileReader()

    reader.onloadend = () => {
      var tempImg = new Image()
      tempImg.src = reader.result

      tempImg.onload = function () {
        var MAX_WIDTH = 400
        var MAX_HEIGHT = 300
        var tempW = tempImg.width
        var tempH = tempImg.height
        if (tempW > tempH) {
          if (tempW > MAX_WIDTH) {
            tempH *= MAX_WIDTH / tempW
            tempW = MAX_WIDTH
          }
        } else {
          if (tempH > MAX_HEIGHT) {
            tempW *= MAX_HEIGHT / tempH
            tempH = MAX_HEIGHT
          }
        }

        var canvas = document.createElement('canvas')
        canvas.width = tempW
        canvas.height = tempH
        var ctx = canvas.getContext('2d')
        ctx.drawImage(this, 0, 0, tempW, tempH)
        var dataURL = canvas.toDataURL('image/jpeg')

        self.setState({ imagePreviewURL: dataURL })

        self.urltoFile(dataURL, 'dummyFileName.png', 'image/jpeg')
          .then((file) => {
            backendService.getCompanyPrediction(file)
              .then((response) => {
                logService.log('image analyzed:', `{result: ${response.Predictions[0].Tag}, probability: ${response.Predictions[0].Probability}}`)
                self.props.returnName(response.Predictions[0].Tag)
              })
          })
      }
    }

    let file = event.target.files[0]

    logService.log('image selected or taken and sent to image recognition API:', file)

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
