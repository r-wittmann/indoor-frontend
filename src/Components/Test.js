import React, { Component } from 'react'


class Test extends Component {
  render () {
    return (
      <div style={this.props.accept ? {backgroundColor: 'blue'} : {}}>
      {this.props.text}
      </div>
    )
  }
}

export default Test
