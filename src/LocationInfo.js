import React, { PureComponent } from "react";

class LocationInfo extends PureComponent {
  render() {
    const { info } = this.props;
    const displayName = `${info.place}, ${info.state}`;

    return (
      <div>
        <div>{displayName}</div>
        <img width={240} src={info.image} />
      </div>
    );
  }
}

export default LocationInfo;
