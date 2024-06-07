import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { env } from "../../env";
import { useEffect, useState } from "react";

export const GMap = ({
  setCoords,
  initMap = { lat: 40.4637, lng: -3.7492 },
  defaultMarker,
}) => {
  const [key, setKey] = useState(env.GOOGLE_MAPS_KEY);

  const [markers, setMarkers] = useState([]);

  const [center, setCenter] = useState(initMap);

  useEffect(() => {
    if (defaultMarker.length != 0) {
      console.log(defaultMarker);
      setCenter(defaultMarker[0]);
      setMarkers(defaultMarker);
    }
  }, []);

  const mapStyles = {
    height: "100%",
    width: "100%",
    borderRadius: "10px 0 0 10px", // 10px para todas las esquinas excepto arriba derecha
  };

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setCenter(null);
    setMarkers([newMarker]);
    setCoords([newMarker]);
  };

  const removeMarker = () => {
    setMarkers([]);
    setCoords([]);
  };

  return (
    <>
      <div className="w-full flex justify-end items-center">
        <button
          onClick={() => {
            removeMarker();
          }}
          type="button"
          className="flex gap-2 justify-center items-center py-1 px-6 bg-red-500 "
        >
          <span className="text-white">Quitar</span>

          <svg
            fill="#fff"
            width="20px"
            height="20px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M797.32 985.882 344.772 1438.43l188.561 188.562 452.549-452.549 452.548 452.549 188.562-188.562-452.549-452.548 452.549-452.549-188.562-188.561L985.882 797.32 533.333 344.772 344.772 533.333z" />
          </svg>
        </button>
      </div>
      <LoadScript googleMapsApiKey={key} loading="async">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={5.5}
          center={center}
          onClick={handleMapClick}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
};
