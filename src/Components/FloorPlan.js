import React, { Component } from 'react'

class FloorPlan extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div style={{ marginTop: 30 }}>
        <svg height='300' width='500' viewBox='85 10 40 125' transform='scale(1, -1)'>
          {this.props.booths && this.props.booths.map((booth) =>
            <g key={Math.random()}>
              <polygon
                points={booth.coordinates}
                style={this.props.highlight.indexOf(booth.name) !== -1
                  ? {fill: 'transparent', stroke: 'green', strokeWidth: 1}
                  : {fill: 'transparent', stroke: 'black', strokeWidth: 0.5}
                }
              />
            </g>
          )}
          <circle cx={this.props.visitorPosition.x} cy={this.props.visitorPosition.y} r='1' stroke='red' fill='transparent' strokeWidth='2' />
        </svg>
      </div>
    )
  }
}

export default FloorPlan
