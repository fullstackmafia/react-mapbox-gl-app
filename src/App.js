import React from "react";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from "react-map-gl";
import LocationInfo from "./LocationInfo";
import LOCATIONS from "./locations.json";
import LocationPin from "./LocationPin";

const TOKEN = process.env.REACT_APP_TOKEN;
const STYLE = process.env.REACT_APP_STYLE;

const fullScreenControlStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

const navStyle = {
  position: "absolute",
  top: 36,
  left: 0,
  padding: "10px"
};

class App extends React.Component {
  state = {
    viewport: {
      latitude: 9.082,
      longitude: 8.6753,
      zoom: 5.5,
      width: 1350,
      height: 650
    },
    showPopup: null
  };

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderLocationMarker = (location, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={location.longitude}
        latitude={location.latitude}
      >
        <LocationPin
          size={20}
          onClick={() => this.setState({ showPopup: location })}
        />
        <p>{location.name}</p>
      </Marker>
    );
  };

  _renderPopup() {
    const { showPopup } = this.state;

    return (
      showPopup && (
        <Popup
          tipsize={5}
          anchor="top"
          longitude={showPopup.longitude}
          latitude={showPopup.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ showPopup: null })}
        >
          <LocationInfo info={showPopup} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    return (
      <ReactMapGL
        mapboxApiAccessToken={TOKEN}
        mapStyle={STYLE}
        {...this.state.viewport}
        onViewportChange={this._updateViewport}
      >
        {LOCATIONS.map(this._renderLocationMarker)}
        {this._renderPopup()}
        <div className="fullscreen" style={fullScreenControlStyle}>
          <FullscreenControl />
        </div>
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    );
  }
}

export default App;
