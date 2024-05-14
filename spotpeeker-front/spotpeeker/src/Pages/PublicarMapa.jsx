import { GoogleMap } from '@googlemaps/react-wrapper';

export const PublicarMapa = () => {


  return (
      <GoogleMap
        id="map"
        mapContainerStyle={{
          width: '100%',
          height: '400px'
        }}
        zoom={10}
        center={{ lat: -34.603722, lng: -58.381592 }} // Coordenadas de Buenos Aires, Argentina (ejemplo)
      />

  );
};
