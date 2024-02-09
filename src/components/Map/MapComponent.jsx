import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css'
import L from 'leaflet'
import { useEffect, useState } from 'react';


const markerIcon = new L.Icon({
  iconUrl: require("../../images/marker.png"),
  iconSize: [25, 25],
  iconAnchor: [10, 25],
  popupAnchor: [3, -46],
});


const MapComponent = ({ positions, setPositions }) => {
  const ZOOM_LEVEL = 10;  

  const AddMarkerToClick = () => {
    useMapEvents({
      dblclick(e) {
        setPositions([...positions, e.latlng]);
      },
    });
    return null;
  }

  const deleteSelectedMarker = (positionToDelete) => {
    const updatedPositions = positions.filter(position => position !== positionToDelete);
    setPositions(updatedPositions);
  }

  return (
    <div className="mapComponentContainer">
      <MapContainer center={[54.898521, 23.903597]} zoom={ZOOM_LEVEL} style={{ height: '400px', width: '100%' }} doubleClickZoom={false}>
        <TileLayer url="https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=ozN3bbKTDDtczKLR79uI" />
        {positions?.map((position, index) => (
          <Marker key={index} position={position} icon={markerIcon}>
            <Popup>
              <button onClick={() => deleteSelectedMarker(position)}>Delete</button>
            </Popup>
          </Marker>
        ))}

        <AddMarkerToClick />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
