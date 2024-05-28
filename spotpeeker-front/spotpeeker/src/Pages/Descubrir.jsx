import { useEffect, useState } from "react";
import { GMapMarkers } from "./Components/GMapMarkers";
import { env } from "../env";
import { Link } from "react-router-dom";
export const Descubrir = () => {
  const [loaded, setLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [markerData, setMarkerData] = useState();

  const getDiscover = async () => {
    try {
      const response = await fetch(`${env.SERVER_URL}/discover/`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (data.status == "success") {
        console.log(data);
        setMarkers(data.markers);
        setLoaded(true);
      }
    } catch (error) {
      console.error("Error al cargar feed:", error);
    }
  };

  const onMarker = (marker) => {
    setMarkerData(marker);
    console.log(marker);
  };

  useEffect(() => {
    getDiscover();
  }, []);

  if (loaded) {
    return (
      <div className="flex justify-end">
        <div className="absolute w-screen h-screen">
          <GMapMarkers markers={markers} onMarker={onMarker} />
        </div>
        {markerData != undefined && (
          <div className="relative mt-[10vh] mr-[5%]">
            <div className="flex flex-col w-full ">
              <div className="flex justify-between p-3 bg-white rounded-t-lg">
                <p>{markerData.autor}</p>
                <Link to={`/usuario/${markerData.autor}`} >Ver perfil </Link>
              </div>
              {markerData.imagenes && markerData.imagenes.length > 0 && (
                <div className="flex justify-center items-center w-[400px] h-[300px] bg-white bg-opacity-30">
                  <img
                  className="object-contain max-w-[400px] max-h-[300px] bg-opacity-30"
                    src={`${env.SERVER_URL}/media/${markerData.imagenes[0].imagen}`}
                    alt="Profile Image"
                  />
                </div>
              )}
              <div></div>
            </div>
          </div>
        )}
      </div>
    );
  }
};
