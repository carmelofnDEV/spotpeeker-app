import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { env } from "../../env";
import { useState } from "react";

export const GMap = ({ setCoords,initMap={lat: 37.6255,lng: -0.9962,} }) => {
  const [key, setKey] = useState(env.GOOGLE_MAPS_KEY);

  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(initMap);

  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setCenter(null);
    setMarkers([newMarker]);
    setCoords([newMarker])
  };

  return (
    <LoadScript googleMapsApiKey={key} loading="async">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={center}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
