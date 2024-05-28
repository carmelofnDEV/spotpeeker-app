import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { env } from "../../env";
import { useState } from "react";

export const GMapMarkers = ({ initMap={ lat: 40.4637, lng: -3.7492 }, markers , onMarker}) => {

  const [key, setKey] = useState(env.GOOGLE_MAPS_KEY);


  const [init, setinit] = useState(initMap)

  const mapStyles = {
    height: "100%",
    width: "100%",
  };


  const handleMarker = (i) => {
    const marker = markers[i];
    setinit(JSON.parse(marker.ubicacion)[0])
    onMarker(marker)
  }

  return (
    <LoadScript googleMapsApiKey={key} loading="async">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={6.8}
        center={init}
      >
        {markers.map((marker,index) => (
        
        <Marker  key={index} onClick={() => handleMarker(index)} position={JSON.parse(marker.ubicacion)[0]} />
          
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
