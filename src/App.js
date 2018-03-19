/*global google*/
import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import axios from "axios";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  OverlayView,
} from "react-google-maps";

import 'react-circular-progressbar/dist/styles.css';
import './App.css';

const { compose, withProps, withState, withHandlers } = require("recompose");

// Edit below constants with your Cityverve API Token and Google Maps Key
const TOKEN = 'YOUR-CITYVERVE-TOKEN-HERE';
const GMAPSKEY = 'YOUR-GOOGLEMAPS-KEY-HERE';
// **********************************************************************

const MANCHESTER   = { lat: 53.4791595, lng: -2.2462938 };
const DEFAULTZOOM = 15; // 1 to 20 range
//const PARK_MAX = 70;
//const parks = Array.from({length: PARK_MAX}, (v, k) => k+1);
const zoomPxMap = {
  '1':'10px',
  '2':'10px',
  '3':'10px',
  '4':'10px',
  '5':'10px',
  '6':'10px',
  '7':'10px',
  '8':'10px',
  '9':'10px',
  '10':'20px',
  '11':'20px',
  '12':'20px',
  '13':'20px',
  '14':'25px',
  '15':'40px',
  '16':'40px',
  '17':'40px',
  '18':'40px',
  '19':'40px',
  '20':'40px',
}

const getPark = (id=1) => {
    let webAPIUrl = `https://api.cityverve.org.uk/v1/entity/car-park/${id}`;
    return axios.get(webAPIUrl, { headers: {"Authorization" : `Bearer ${TOKEN}`}});
}

const getParkList = () => {
    let webAPIUrl = `https://api.cityverve.org.uk/v1/entity/car-park`;
    return axios.get(webAPIUrl, { headers: {"Authorization" : `Bearer ${TOKEN}`}});
}

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
})

class App extends Component {
  componentWillMount() {
    this.setState({ parks: [] })
  }
  componentDidMount() {
    getParkList().then((response) => {
      let data = response.data;
      let parks = data.map(park => park.id);
      this.setState({ parks });
    })
  }
  render() {
    return (
      <div>
        <ParkMapComponent parks={this.state.parks} key="map" />
      </div>
    );
  }
}

const ParkMapComponent = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${GMAPSKEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: window.innerHeight }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withState('zoom', 'onZoomChange', DEFAULTZOOM),
  withHandlers(() => {
      const refs = {
        map: undefined,
      }

      return {
        onMapMounted: () => ref => {
          refs.map = ref
        },
        onZoomChanged: ({ onZoomChange }) => () => {
          onZoomChange(refs.map.getZoom())
        }
      }
    }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultCenter={MANCHESTER}
    zoom={props.zoom}
    ref={props.onMapMounted}
    onZoomChanged={props.onZoomChanged}
  >
    {props.parks.map(function(id, index){
      return <ParkMap key={id} parkID={id} zoom={props.zoom} />;
    })}
  </GoogleMap>
));

class ParkMap extends Component {
  constructor(props) {
      super(props);
      this.state = {
        percentage: 0,
        lat: 0,
        lang: 0,
        loading: true,
      };
  }
  componentDidMount = (e) => {
    let parkID = this.props.parkID;
    getPark(parkID).then(response => {
      let data = response.data[0];
      let entity = data.entity;
      let coordinates = data.loc.coordinates;
      let lng = coordinates[0];
      let lat = coordinates[1];
      let percentage = Math.floor((entity.occupancy / entity.capacity) * 100) ;
      this.setState({percentage,lat,lng,loading: false});
    });
  }
  render() {
    //let metersPerPx = 156543.03392 * Math.cos(this.state.lat * Math.PI / 180) / Math.pow(2, this.props.zoom);
    //let box = 100 / metersPerPx ; // Where we scale, I need a better way to handle
    let classForPercentage = function(percent){
      let myClass;
      if(percent === 100){
        myClass = 'red';
      } else if(percent < 50){
        myClass = 'green';
      } else {
        myClass = 'orange';
      }
      return myClass;
    }
    return (
      <OverlayView
          position={{ lat:this.state.lat, lng:this.state.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={getPixelPositionOffset}
        >
         <div style={{ width: zoomPxMap[this.props.zoom], height: zoomPxMap[this.props.zoom], display: this.state.loading ? 'none' : 'block' }}>
            <CircularProgressbar
              classForPercentage={ classForPercentage }
              background
              percentage={this.state.percentage} />
          </div>
        </OverlayView>
    );
  }
}

export default App;
