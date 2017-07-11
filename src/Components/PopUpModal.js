import React, { Component } from 'react'
import Modal from 'react-modal'
import example1 from '../example1.png'
import example2 from '../example2.png'
import example3 from '../example3.png'

class PopUpModal extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        contentLabel='Help Modal'
        style={{ content: { padding: 0, top: 10, right: 10, bottom: 10, left: 10 } }}
      >
        <div className='modalstyle' style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className='header-blue'>
            <h2 style={{ textAlign: 'center', color: 'white' }}>Help</h2>
            <p style={{ textAlign: 'center', color: 'white' }}>How to take the right picture:</p>
          </div>
          <div id='modalBody' style={{ padding: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className='row' style={{ display: 'flex', alignItems: 'center' }}>
              <div className='col-xs-6'>
                <img src={example1} className='img-responsive' style={{ borderRadius: 4 }} alt='bad-example' />
              </div>
              <div className='col-xs-6 text-right'>
                Go closer to the logo!
              </div>
            </div>
            <div className='row' style={{ display: 'flex', alignItems: 'center' }}>
              <div className='col-xs-6 text-left'>
                This is a good example!
              </div>
              <div className='col-xs-6'>
                <img src={example2} className='img-responsive' style={{ borderRadius: 4 }} alt='bad-example' />
              </div>
            </div>
            <div className='row' style={{ display: 'flex', alignItems: 'center' }}>
              <div className='col-xs-6'>
                <img src={example3} className='img-responsive' style={{ borderRadius: 4 }} alt='bad-example' />
              </div>
              <div className='col-xs-6 text-right'>
                Make sure only one logo is on the picture!
              </div>
            </div>
            <div />
            <div className='row'>
              <button className='btn btn-primary center-block' onClick={this.props.closeModal}>
                Got it!
              </button>
            </div>
          </div>
        </div>
      </Modal>

    )
  }
}

export default PopUpModal
