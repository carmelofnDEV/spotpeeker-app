import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { env } from "../../env";
import { useState } from "react";

export const GMapStatic = ({ position}) => {
  const [key, setKey] = useState(env.GOOGLE_MAPS_KEY);




  const mapStyles = {
    height: "100%",
    width: "100%",
  };


  return (
    <LoadScript googleMapsApiKey={key} loading="async">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={position}
      >
        <Marker  position={position} />
      </GoogleMap>
    </LoadScript>
  );
};
