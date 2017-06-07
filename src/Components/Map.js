import React, { Component } from 'react'
import { Map, TileLayer, Polygon, Marker, Popup } from 'react-leaflet'

class MapComponent extends Component {
  constructor () {
    super()
    this.state = {
      zoom: 18
    }
  }

  render () {
    return (
      <Map center={this.props.position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.props.booths.map((booth) =>
          <Polygon key={Math.random()} positions={booth.coordinates}>
            <Popup>
              <div>
                <span><strong>{booth.name}</strong></span><br />
                <span>Area: <strong>B1</strong></span>
              </div>
            </Popup>
          </Polygon>
        )}
        <Marker position={this.props.position} />
      </Map>
    )
  }
}

export default MapComponent
