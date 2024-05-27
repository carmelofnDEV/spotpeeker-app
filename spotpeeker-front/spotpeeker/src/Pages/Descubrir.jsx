import { useEffect, useState } from "react";
import { GMapMarkers } from "./Components/GMapMarkers";
import { env } from "../env";



export const Descubrir = () => {
  
const [loaded ,setLoaded] = useState(false)
const [markers,setMarkers] = useState([])



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


  useEffect(() => {
    
    getDiscover()
  }, [])
  

if (loaded) {
    
    return(
        <div className="w-screen h-screen">
            <GMapMarkers markers={markers}/>

        </div>
        );
}
}