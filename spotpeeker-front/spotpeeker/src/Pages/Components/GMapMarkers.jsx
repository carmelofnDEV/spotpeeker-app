import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { env } from "../../env";
import { useState } from "react";

export const GMapMarkers = ({ initMap={ lat: 40.4637, lng: -3.7492 }, markers}) => {

  const [key, setKey] = useState(env.GOOGLE_MAPS_KEY);




  const mapStyles = {
    height: "100%",
    width: "100%",
  };


  const handleMarker = (i) => {
    console.log("marker",markers[i])
  }

  return (
    <LoadScript googleMapsApiKey={key} loading="async">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={6.8}
        center={initMap}
      >
        {markers.map((marker,index) => (
        
        <Marker  key={index} onClick={() => handleMarker(index)} position={JSON.parse(marker.ubicacion)[0]} />
          
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
