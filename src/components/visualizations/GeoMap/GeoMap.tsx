import React from 'react'
import L, { IconOptions } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import "/node_modules/leaflet/dist/leaflet.css"
import "./geomap.css"

export interface GeoData {
  lat: number
  lng: number
  [other: string]: any
}

export interface GeoMapVizProps {
  geoData: GeoData[]
  scrollWheelZoom?: boolean
  height?: number
  width?: number
  zoom?: number
  maxZoom?: number
}

const GeoMapViz: React.FC<GeoMapVizProps> = ({
  geoData,
  scrollWheelZoom=false,
  height=500,
  width=800,
  zoom=13,
  maxZoom=16,
}) => {
  const centerPosition = {lat: 38.627003, lng: -90.199402} // Saint Louis

  const iconOptions: IconOptions = {
    iconUrl: `https://ui-avatars.com/api/?name=""&rounded=true&background=89cff0`,
    iconSize: [16, 16],
    className: 'marker-icon',
  }

  return (
    <MapContainer
      center={centerPosition}
      zoom={zoom}
      maxZoom={maxZoom}
      scrollWheelZoom={scrollWheelZoom}
      style={{height: height, width: width}}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={maxZoom}
      />
      {geoData.map((point, index) => (

        <Marker
          key={`geo-marker-${index}`}
          position={{lat: point.lat, lng: point.lng}}
          icon={L.icon(iconOptions)}>
          {Object.keys(point).length > 2 && (
            <Popup>
              {Object.keys(point).map(key => (
                <p key={key}>{key}: {point[key]}</p>
              ))}
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  )
}

export default GeoMapViz
