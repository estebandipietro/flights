/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Polyline,
} from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

import { UNITED_STATES_CENTER } from 'constants/constants';
import { AirportDTO } from 'types/AirportType';

interface MyGoogleMapProps {
  from: AirportDTO | null;
  to: AirportDTO | null;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
}

const MyGoogleMap = ({ from, to, setMap }: MyGoogleMapProps) => {
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(
    null
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API as string,
  });

  useEffect(() => {
    async function calculateRoute() {
      if (from && to) {
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: { lat: from?.latitude, lng: from?.longitude },
          destination: { lat: to?.latitude, lng: to?.longitude },
          travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);
      }
    }

    if (from && to) {
      setDirectionsResponse(null);
      calculateRoute();
    }
  }, [from, to]);

  return (
    <React.Fragment>
      {isLoaded ? (
        <GoogleMap
          center={UNITED_STATES_CENTER}
          zoom={4}
          options={{ minZoom: 2 }}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={map => setMap(map)}
        >
          {from && <Marker position={{ lat: from.latitude, lng: from.longitude }} />}
          {to && <Marker position={{ lat: to.latitude, lng: to.longitude }} />}
          {from && to && directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          {from && to && (
            <Polyline
              options={{ geodesic: true, strokeOpacity: 0.7, strokeWeight: 2 }}
              path={[
                { lat: from.latitude, lng: from.longitude },
                { lat: to.latitude, lng: to.longitude },
              ]}
            />
          )}
        </GoogleMap>
      ) : null}
    </React.Fragment>
  );
};

export default MyGoogleMap;
