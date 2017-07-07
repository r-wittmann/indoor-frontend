import React, { Component } from 'react'
import backendService from '../backendService'
import 'bootstrap/dist/css/bootstrap.css'

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

    reader.onloadend = () => this.setState({ imagePreviewURL: reader.result })

    reader.readAsDataURL(file)
  }

  render () {
    return (
    

      <div style={{ height: 64, textAlign: 'center'}}>
       <label htmlFor='PickFileButton'>

       <span className='glyphicon glyphicon-camera' style={{color:'white', marginTop: 20}}></span>

    </label>

    <input id='PickFileButton' type='file' style={{display:'none'}} accept='image/*' onChange={this.handleImageChange}/>
        {this.state.imagePreviewURL &&
          <div>
            <img src={this.state.imagePreviewURL} style={{ height: 42 }} alt='selectedPicture' />
          </div>
        }
      </div>
    )
  }
}

export default ImageInput
