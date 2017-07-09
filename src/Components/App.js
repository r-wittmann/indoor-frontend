import React, { Component } from 'react'
import AppHeader from './AppHeader'
import MapComponent from './Map'
import ImageInput from './ImageInput'
import backendService from '../backendService'
import Modal from 'react-modal'
import example1 from '../example1.png'
import example2 from '../example2.png'
import example3 from '../example3.png'

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
      modalIsOpen: false,
    }

    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this)
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
    openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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
              style={{backgroundColor: '#264082', fontColor: 'white', fontFamily:'Source Sans Pro'}}
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
              style={{marginTop:15, fontFamily:'Source Sans Pro'}} 
              onClick={this.openModal}>Help
            </button>

              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
              >
                <div className='modalstyles'>
                  <div className='header-blue'>
                    <h2 style={{fontFamily:'Source Sans Pro', textAlign:'center', color:'white'}}>Help</h2>
                    <p style={{fontFamily:'Source Sans Pro', textAlign:'center', color:'white'}}>How to take the right picture:</p> 
                  </div>
                  <div className='row' style={{padding: 8}}>
                    <div className='col-xs-2' 
                      style={{height: 90, width: 150, backgroundColor:'grey', float: 'left', margin:8}}>
                        <img 
                          src={example1} style={{ maxHeight: 90}}/>
                    </div>
                    <div className='col-xs-2' style={{height: 90, width: 140, float: 'left', margin:8, fontFamily:'Source Sans Pro', textAlign:'right'}}>Go closer to the logo!</div>
                  </div>

                  <div className='row' style={{padding: 8}}>
                    <div 
                      className='col-xs-2' 
                      style={{height: 90, width: 140, float: 'left', margin:8, fontFamily:'Source Sans Pro', textAlign:'left'}}>
                        <p style={{verticalAlign: 'middle'}}>This is a good example!</p>
                    </div>
                    <div 
                      className='col-xs-2' 
                      style={{height: 90, width: 150, float: 'left', margin:8}}> 
                        <img src={example2} style={{ maxHeight: 90}}/>
                    </div>
                  </div>
                  <div className='row' style={{padding: 8}}>
                    <div 
                      className='col-xs-2' 
                      style={{height: 90, width: 150, backgroundColor:'grey', float: 'left', margin:8}}>
                        <img src={example3} style={{ maxHeight: 90}}/>
                    </div>
                    <div 
                      className='col-xs-2' 
                      style={{height: 90, width: 140, float: 'left', margin:8, fontFamily:'Source Sans Pro', textAlign:'right'}}>Make sure only one logo is on the picture!
                    </div>
                  </div>
                  <div 
                    className='row' 
                    style={{padding: 8}} style={{bottom: 16, position: 'absolute', textAlign: 'center', width:'100%'}}>
                      <button 
                        className='btn btn-primary center-block' 
                        onClick={this.closeModal}>Got it!
                      </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
       </div>
    )

  }
}


export default App
